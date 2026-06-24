// Client-side PDF -> EPUB conversion.
//
// Text is extracted with Mozilla's PDF.js (`pdfjs-dist`) and assembled into a
// valid EPUB 3 container (a ZIP with a specific structure) using JSZip.
// Everything runs in the browser — no file ever leaves the user's machine.
//
// PDF.js and JSZip touch browser-only globals (DOMMatrix, Worker) at module
// load, so they're imported lazily inside convertPdfToEpub — never during SSR.

export interface ConvertOptions {
  title?: string;
  author?: string;
  /** Called as work proceeds, fraction in 0..1 plus a status message. */
  onProgress?: (fraction: number, message: string) => void;
}

export interface ConvertResult {
  blob: Blob;
  filename: string;
  pageCount: number;
  chapterCount: number;
  /** True if no extractable text was found (likely a scanned/image PDF). */
  empty: boolean;
}

interface RawItem {
  str: string;
  transform: number[];
  height: number;
  hasEOL: boolean;
}

interface Line {
  /** Left x of the first glyph — used to detect paragraph indentation. */
  x: number;
  /** Baseline y — used to detect vertical gaps. */
  y: number;
  /** Tallest glyph on the line — used to detect headings. */
  h: number;
  /** Fraction of characters that are unmapped glyphs (decorative fonts). */
  nul: number;
  /** Cleaned, display-ready text. */
  text: string;
  /** Raw text before NUL stripping (kept to measure `nul`). */
  raw: string;
}

interface Chapter {
  title: string | null;
  paras: string[];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Glyphs with no Unicode mapping (common in decorative chapter-heading fonts)
// decode to NUL. Strip them, then normalise whitespace.
function clean(s: string): string {
  return s.replace(/\u0000/g, "").replace(/\s+/g, " ").trim();
}

function nulRatio(s: string): number {
  if (!s) return 0;
  let n = 0;
  for (let i = 0; i < s.length; i++) if (s.charCodeAt(i) === 0) n++;
  return n / s.length;
}

// Reconstruct text lines from a page's positioned glyph runs. PDF.js marks the
// end of a visual line with `hasEOL`; word gaps arrive as space-only items.
function linesFromItems(items: RawItem[]): Line[] {
  const lines: Line[] = [];
  let buf = "";
  let startX: number | null = null;
  let y = 0;
  let h = 0;
  let started = false;

  const flush = () => {
    if (!started) return;
    const raw = buf.replace(/[ \t]+/g, " ").trim();
    if (raw) lines.push({ x: startX ?? 0, y, h, nul: nulRatio(raw), text: clean(raw), raw });
  };

  for (const it of items) {
    const s = it.str;
    if (s && s.trim()) {
      if (!started) {
        startX = it.transform[4];
        started = true;
      }
      buf += s;
      y = it.transform[5];
      if (it.height > h) h = it.height;
    } else if (s) {
      buf += " ";
    }
    if (it.hasEOL) {
      flush();
      buf = "";
      startX = null;
      h = 0;
      started = false;
    }
  }
  flush();
  return lines;
}

// The most common glyph height (weighted by character count) is the body text
// size; headings are meaningfully taller.
function modeHeight(pages: Line[][]): number {
  const counts = new Map<number, number>();
  for (const lines of pages) {
    for (const l of lines) {
      const k = Math.round(l.h);
      counts.set(k, (counts.get(k) ?? 0) + l.text.length);
    }
  }
  let best = 12;
  let bestC = 0;
  for (const [k, c] of counts) {
    if (c > bestC) {
      bestC = c;
      best = k;
    }
  }
  return best;
}

// A bare page number / folio (arabic or roman numerals) — drop from the flow.
function isFolio(t: string): boolean {
  return /^[\divxlcdm.\-]{1,6}$/i.test(t.replace(/\s/g, ""));
}

const NUL_LINE_THRESHOLD = 0.3;

// Walk the whole document, reflowing text into paragraphs and splitting into
// chapters at large-font heading lines. Reflow uses two signals: a heading
// flushes the current paragraph and opens a chapter; within body text a new
// paragraph starts on an indented line (or the natural top of a page), while
// non-indented continuation lines — including across page breaks — are merged.
function buildChapters(pages: Line[][]): Chapter[] {
  const body = modeHeight(pages) || 12;
  const headingMin = body * 1.35;

  const chapters: Chapter[] = [];
  let cur: Chapter | null = null;
  let para = "";
  let justHeading = false;
  let carry = false; // an open paragraph that may continue onto the next page

  const flushPara = () => {
    if (cur && para.trim()) cur.paras.push(para.trim());
    para = "";
  };
  const newChapter = (title: string | null) => {
    flushPara();
    cur = { title, paras: [] };
    chapters.push(cur);
  };
  const ensure = () => {
    if (!cur) newChapter(null);
  };

  for (const lines of pages) {
    const bodyLines = lines.filter((l) => l.h < headingMin && l.nul < NUL_LINE_THRESHOLD && l.text);
    const leftMargin = bodyLines.length ? Math.min(...bodyLines.map((l) => l.x)) : 0;
    let firstBodySeen = false;

    for (const ln of lines) {
      const isHeading =
        ln.h >= headingMin && ln.text.replace(/[^A-Za-z0-9]/g, "").length <= 60;

      if (isHeading) {
        // Merge consecutive heading lines (wrapped titles) into one.
        if (justHeading && chapters.length) {
          const last = chapters[chapters.length - 1];
          last.title = (last.title ? last.title + " " : "") + ln.text;
        } else {
          newChapter(ln.text);
          justHeading = true;
        }
        carry = false;
        continue;
      }
      justHeading = false;

      // Drop decorative-font garbage (unmapped glyphs) and bare page numbers.
      if (ln.nul >= NUL_LINE_THRESHOLD || !ln.text || isFolio(ln.text)) continue;

      ensure();
      const indented = ln.x > leftMargin + 4;
      const atPageTop = !firstBodySeen;
      firstBodySeen = true;
      if (indented || (atPageTop && !carry)) flushPara();
      para += (para ? " " : "") + ln.text;
      carry = false;
    }
    carry = para.length > 0;
  }
  flushPara();

  return chapters.filter((c) => c.paras.length > 0);
}

// Chapter titles often come from decorative fonts and survive as capital-only
// fragments. Keep a title only if it has a recognisable word; otherwise number
// the chapter by position. Very long chapters (e.g. a heading-less document)
// are split into reader-friendly parts.
interface Section {
  id: string;
  href: string;
  label: string;
  xhtml: string;
}

const MAX_PARAS_PER_FILE = 400;

function buildSections(chapters: Chapter[]): Section[] {
  const sections: Section[] = [];
  let counter = 0;

  chapters.forEach((ch, i) => {
    const title = (ch.title ?? "").trim();
    const readable = title.split(/\s+/).some((w) => /[A-Za-z]{3,}/.test(w));
    const baseLabel = readable ? title : `Chapter ${i + 1}`;

    // Split oversized chapters so no single XHTML file is unwieldy.
    const parts: string[][] = [];
    if (ch.paras.length > MAX_PARAS_PER_FILE) {
      const per = Math.ceil(ch.paras.length / Math.ceil(ch.paras.length / MAX_PARAS_PER_FILE));
      for (let j = 0; j < ch.paras.length; j += per) parts.push(ch.paras.slice(j, j + per));
    } else {
      parts.push(ch.paras);
    }

    parts.forEach((paras, p) => {
      const label = parts.length > 1 ? `${baseLabel} (${p + 1}/${parts.length})` : baseLabel;
      const id = `sec-${counter++}`;
      const href = `${id}.xhtml`;
      const inner = `<section epub:type="chapter">
<h1>${escapeHtml(label)}</h1>
${paras.map((para) => `<p>${escapeHtml(para)}</p>`).join("\n")}
</section>`;
      sections.push({ id, href, label, xhtml: xhtmlDocument(label, inner) });
    });
  });

  return sections;
}

function xhtmlDocument(title: string, bodyInner: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
${bodyInner}
</body>
</html>`;
}

const STYLESHEET = `body { font-family: Georgia, "Times New Roman", serif; line-height: 1.5; margin: 1em 1.2em; }
h1 { font-family: Helvetica, Arial, sans-serif; font-size: 1.5em; line-height: 1.25; margin: 1em 0 0.8em; text-align: left; }
p { margin: 0; text-indent: 1.4em; text-align: justify; hyphens: auto; }
p:first-of-type { text-indent: 0; }`;

function slugifyFilename(title: string): string {
  const base =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "converted";
  return `${base}.epub`;
}

// A stable unique id without relying on Date.now()/Math.random().
function makeBookId(title: string): string {
  let hash = 5381;
  for (let i = 0; i < title.length; i++) hash = (hash * 33) ^ title.charCodeAt(i);
  return `urn:uuid:pdf2epub-${(hash >>> 0).toString(16)}-${title.length}`;
}

export async function convertPdfToEpub(
  file: File,
  options: ConvertOptions = {}
): Promise<ConvertResult> {
  const onProgress = options.onProgress ?? (() => {});
  const fallbackTitle = file.name.replace(/\.pdf$/i, "") || "Converted Document";
  const title = (options.title || fallbackTitle).trim() || fallbackTitle;
  const author = (options.author || "Unknown").trim() || "Unknown";

  onProgress(0.02, "Loading PDF…");

  const pdfjsLib = await import("pdfjs-dist");
  const { default: JSZip } = await import("jszip");

  // Self-host the worker (no external CDN) so it works in locked-down networks.
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  const pageCount = pdf.numPages;

  const pages: Line[][] = [];
  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    pages.push(linesFromItems(content.items as unknown as RawItem[]));
    page.cleanup();
    onProgress(0.05 + 0.75 * (pageNum / pageCount), `Extracting text — page ${pageNum} of ${pageCount}…`);
  }
  await loadingTask.destroy();

  onProgress(0.82, "Organising chapters…");
  const chapters = buildChapters(pages);
  const anyText = chapters.length > 0;

  let sections = buildSections(chapters);
  if (!sections.length) {
    // Scanned / image-only PDF — produce a valid EPUB explaining why it's empty.
    const inner = `<section>
<h1>${escapeHtml(title)}</h1>
<p>No selectable text could be extracted from this PDF. It is most likely a
scanned document or image-only file. Converting it would require OCR, which
this tool does not perform.</p>
</section>`;
    sections = [{ id: "sec-0", href: "sec-0.xhtml", label: title, xhtml: xhtmlDocument(title, inner) }];
  }

  onProgress(0.88, "Building EPUB…");

  const zip = new JSZip();

  // mimetype MUST be the first entry and stored (uncompressed) per the spec.
  zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

  zip.file(
    "META-INF/container.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
  );

  const oebps = zip.folder("OEBPS")!;
  oebps.file("style.css", STYLESHEET);
  for (const s of sections) oebps.file(s.href, s.xhtml);

  const bookId = makeBookId(title);
  const modified = "2026-01-01T00:00:00Z"; // fixed for reproducible output

  const manifestItems = sections
    .map((s) => `    <item id="${s.id}" href="${s.href}" media-type="application/xhtml+xml"/>`)
    .join("\n");
  const spineItems = sections.map((s) => `    <itemref idref="${s.id}"/>`).join("\n");

  oebps.file(
    "content.opf",
    `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="book-id">${bookId}</dc:identifier>
    <dc:title>${escapeHtml(title)}</dc:title>
    <dc:creator>${escapeHtml(author)}</dc:creator>
    <dc:language>en</dc:language>
    <meta property="dcterms:modified">${modified}</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="style" href="style.css" media-type="text/css"/>
${manifestItems}
  </manifest>
  <spine toc="ncx">
${spineItems}
  </spine>
</package>`
  );

  const navList = sections
    .map((s) => `      <li><a href="${s.href}">${escapeHtml(s.label)}</a></li>`)
    .join("\n");
  oebps.file(
    "nav.xhtml",
    xhtmlDocument(
      "Table of Contents",
      `<nav epub:type="toc" id="toc">
  <h1>Table of Contents</h1>
  <ol>
${navList}
  </ol>
</nav>`
    )
  );

  const navPoints = sections
    .map(
      (s, i) => `    <navPoint id="nav-${i}" playOrder="${i + 1}">
      <navLabel><text>${escapeHtml(s.label)}</text></navLabel>
      <content src="${s.href}"/>
    </navPoint>`
    )
    .join("\n");
  oebps.file(
    "toc.ncx",
    `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${bookId}"/>
  </head>
  <docTitle><text>${escapeHtml(title)}</text></docTitle>
  <navMap>
${navPoints}
  </navMap>
</ncx>`
  );

  const blob = await zip.generateAsync({
    type: "blob",
    mimeType: "application/epub+zip",
    compression: "DEFLATE",
  });

  onProgress(1, "Done");

  return {
    blob,
    filename: slugifyFilename(title),
    pageCount,
    chapterCount: sections.length,
    empty: !anyText,
  };
}
