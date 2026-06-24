// Client-side PDF -> EPUB conversion.
//
// Text is extracted with Mozilla's PDF.js (`pdfjs-dist`) and assembled into a
// valid EPUB 3 container (a ZIP with a specific structure) using JSZip.
// Everything runs in the browser — no file ever leaves the user's machine.

// PDF.js and JSZip reference browser-only globals (DOMMatrix, Worker) at module
// load, so they're imported lazily inside convertPdfToEpub — never during SSR.

export interface ConvertOptions {
  title?: string;
  author?: string;
  /** Called as pages are processed, 0..1. */
  onProgress?: (fraction: number, message: string) => void;
}

export interface ConvertResult {
  blob: Blob;
  filename: string;
  pageCount: number;
  /** True if no extractable text was found (likely a scanned/image PDF). */
  empty: boolean;
}

interface Line {
  text: string;
  y: number;
  height: number;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Turn the positioned text items from one PDF page into HTML paragraphs.
// PDF has no notion of paragraphs, so we reconstruct lines from `hasEOL`
// markers and group lines into paragraphs by vertical spacing.
function pageItemsToParagraphs(
  items: { str: string; transform: number[]; height: number; hasEOL: boolean }[]
): string[] {
  const lines: Line[] = [];
  let buffer = "";
  let lineY = 0;
  let lineHeight = 0;

  for (const item of items) {
    if (item.str) {
      buffer += item.str;
      lineY = item.transform[5];
      lineHeight = item.height || lineHeight;
    }
    if (item.hasEOL) {
      const trimmed = buffer.trim();
      if (trimmed) lines.push({ text: trimmed, y: lineY, height: lineHeight });
      else if (lines.length) {
        // Blank line acts as a hard paragraph break.
        lines.push({ text: "", y: lineY, height: lineHeight });
      }
      buffer = "";
    } else if (item.str) {
      buffer += " ";
    }
  }
  if (buffer.trim()) lines.push({ text: buffer.trim(), y: lineY, height: lineHeight });

  // Group lines into paragraphs. A new paragraph starts on a blank line or
  // when the vertical gap to the previous line is noticeably larger than the
  // text height (i.e. extra leading between blocks).
  const paragraphs: string[] = [];
  let current = "";
  let prevY: number | null = null;
  let prevHeight = 0;

  const flush = () => {
    const text = current.replace(/\s+/g, " ").trim();
    if (text) paragraphs.push(text);
    current = "";
  };

  for (const line of lines) {
    if (line.text === "") {
      flush();
      prevY = null;
      continue;
    }
    if (prevY !== null) {
      const gap = prevY - line.y;
      const threshold = (prevHeight || line.height || 10) * 1.8;
      if (gap > threshold || gap < 0) {
        flush();
      }
    }
    current += (current ? " " : "") + line.text;
    prevY = line.y;
    prevHeight = line.height;
  }
  flush();

  return paragraphs;
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

const STYLESHEET = `body { font-family: Georgia, "Times New Roman", serif; line-height: 1.6; margin: 1.2em 1.4em; }
h1, h2 { font-family: Helvetica, Arial, sans-serif; line-height: 1.25; }
h1 { font-size: 1.5em; margin: 1em 0 0.6em; }
p { margin: 0 0 0.8em; text-align: justify; hyphens: auto; }
section { page-break-before: always; }
section:first-of-type { page-break-before: avoid; }`;

function slugifyFilename(title: string): string {
  const base =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "converted";
  return `${base}.epub`;
}

// A stable-enough unique id without relying on Date.now()/Math.random().
function makeBookId(title: string): string {
  let hash = 5381;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 33) ^ title.charCodeAt(i);
  }
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

  onProgress(0.02, "Reading PDF…");

  const pdfjsLib = await import("pdfjs-dist");
  const { default: JSZip } = await import("jszip");

  // PDF.js needs a web worker. Letting the bundler resolve the URL keeps the
  // worker self-hosted (no external CDN), which matters in locked-down networks.
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  const pageCount = pdf.numPages;

  // Each PDF page becomes one EPUB section. Pages with no text are skipped
  // in the output but still counted toward progress.
  const sections: { id: string; href: string; xhtml: string }[] = [];
  let anyText = false;

  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const items = content.items as unknown as {
      str: string;
      transform: number[];
      height: number;
      hasEOL: boolean;
    }[];
    const paragraphs = pageItemsToParagraphs(items);
    page.cleanup();

    if (paragraphs.length) {
      anyText = true;
      const id = `page-${pageNum}`;
      const href = `${id}.xhtml`;
      const body = `<section epub:type="chapter" id="${id}">
<h1>Page ${pageNum}</h1>
${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n")}
</section>`;
      sections.push({ id, href, xhtml: xhtmlDocument(`Page ${pageNum}`, body) });
    }

    onProgress(0.05 + 0.8 * (pageNum / pageCount), `Extracting page ${pageNum} of ${pageCount}…`);
  }

  await loadingTask.destroy();

  onProgress(0.9, "Building EPUB…");

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

  // If nothing was extractable (e.g. a scanned PDF), still produce a valid
  // EPUB with an explanatory page rather than failing.
  if (!sections.length) {
    const body = `<section id="empty">
<h1>${escapeHtml(title)}</h1>
<p>No selectable text could be extracted from this PDF. It may be a scanned
document or image-only file. Converting it would require OCR, which this tool
does not perform.</p>
</section>`;
    sections.push({ id: "empty", href: "empty.xhtml", xhtml: xhtmlDocument(title, body) });
  }

  for (const section of sections) {
    oebps.file(section.href, section.xhtml);
  }

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
    .map((s, i) => `      <li><a href="${s.href}">${escapeHtml(sectionTitle(s.id, i))}</a></li>`)
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
      <navLabel><text>${escapeHtml(sectionTitle(s.id, i))}</text></navLabel>
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
    empty: !anyText,
  };
}

function sectionTitle(id: string, index: number): string {
  if (id === "empty") return "Document";
  const m = /^page-(\d+)$/.exec(id);
  return m ? `Page ${m[1]}` : `Section ${index + 1}`;
}
