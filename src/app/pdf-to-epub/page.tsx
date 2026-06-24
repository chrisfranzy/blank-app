"use client";

import { useCallback, useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  BookOpen,
  Download,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { convertPdfToEpub, type ConvertResult } from "@/lib/pdf-to-epub";

type Status = "idle" | "ready" | "converting" | "done" | "error";

export default function PdfToEpubPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptFile = useCallback((f: File | undefined) => {
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("That doesn't look like a PDF. Please choose a .pdf file.");
      setStatus("error");
      return;
    }
    setFile(f);
    setTitle(f.name.replace(/\.pdf$/i, ""));
    setStatus("ready");
    setError("");
    setResult(null);
    setProgress(0);
  }, []);

  const reset = () => {
    setFile(null);
    setTitle("");
    setAuthor("");
    setStatus("idle");
    setProgress(0);
    setMessage("");
    setError("");
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus("converting");
    setError("");
    setProgress(0);
    try {
      const res = await convertPdfToEpub(file, {
        title,
        author,
        onProgress: (fraction, msg) => {
          setProgress(fraction);
          setMessage(msg);
        },
      });
      setResult(res);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Something went wrong while converting the PDF."
      );
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const busy = status === "converting";

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Tools
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          PDF → EPUB
        </h1>
        <p className="text-ink-muted mt-2">
          Drop in a PDF and get back an EPUB you can read on any e-reader.
          Conversion happens entirely in your browser — your file is never uploaded.
        </p>
      </div>

      {/* Dropzone */}
      <Card className="p-0 overflow-hidden">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            if (!busy) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (busy) return;
            acceptFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex flex-col items-center justify-center gap-3 px-6 py-12 text-center cursor-pointer transition-colors ${
            dragging ? "bg-accent-coral/10" : "hover:bg-surface-2/40"
          } ${busy ? "pointer-events-none opacity-60" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => acceptFile(e.target.files?.[0] ?? undefined)}
          />
          <div className="w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center">
            <UploadCloud className="w-7 h-7 text-accent-coral" />
          </div>
          <div>
            <p className="text-ink font-medium">
              {file ? "Choose a different PDF" : "Drop a PDF here, or click to browse"}
            </p>
            <p className="text-sm text-ink-faint mt-1">Max recommended size ~50 MB</p>
          </div>
        </label>
      </Card>

      {/* Selected file + metadata */}
      {file && (
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-accent-sand" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-ink font-medium truncate">{file.name}</p>
              <p className="text-sm text-ink-faint">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!busy && (
              <button
                onClick={reset}
                className="text-ink-faint hover:text-ink transition-colors"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-faint mb-1.5">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={busy}
                className="w-full rounded-lg bg-surface-2 border border-surface-4 px-3 py-2 text-ink text-sm focus:outline-none focus:border-accent-coral disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-faint mb-1.5">
                Author
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={busy}
                placeholder="Unknown"
                className="w-full rounded-lg bg-surface-2 border border-surface-4 px-3 py-2 text-ink text-sm focus:outline-none focus:border-accent-coral disabled:opacity-60 placeholder:text-ink-faint"
              />
            </div>
          </div>

          {status !== "done" && (
            <button
              onClick={handleConvert}
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent-coral text-surface-0 font-medium px-4 py-3 hover:bg-accent-coral-light transition-colors disabled:opacity-70"
            >
              {busy ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Converting…
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" /> Convert to EPUB
                </>
              )}
            </button>
          )}

          {/* Progress */}
          {busy && (
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                <div
                  className="h-full bg-accent-coral transition-all duration-200"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="text-sm text-ink-faint">{message}</p>
            </div>
          )}
        </Card>
      )}

      {/* Result */}
      {status === "done" && result && (
        <Card className="space-y-4 border border-accent-sage/40">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-accent-sage shrink-0 mt-0.5" />
            <div>
              <p className="text-ink font-medium">Conversion complete</p>
              <p className="text-sm text-ink-muted mt-0.5">
                {result.pageCount} page{result.pageCount === 1 ? "" : "s"} processed.
              </p>
              {result.empty && (
                <p className="text-sm text-accent-sand mt-2 flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  No selectable text was found — this looks like a scanned PDF, so the
                  EPUB will be mostly empty. OCR isn&apos;t supported.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-sage text-surface-0 font-medium px-4 py-3 hover:bg-accent-sage-light transition-colors"
            >
              <Download className="w-4 h-4" /> Download {result.filename}
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-surface-4 text-ink-muted font-medium px-4 py-3 hover:text-ink hover:border-ink-faint transition-colors"
            >
              Convert another
            </button>
          </div>
        </Card>
      )}

      {/* Error */}
      {status === "error" && error && (
        <Card className="border border-accent-coral/50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-coral shrink-0 mt-0.5" />
            <p className="text-sm text-ink-muted">{error}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
