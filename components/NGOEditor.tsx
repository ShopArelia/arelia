"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Cause } from "@/data/causes";

type NGOEditorProps = {
  mode: "new" | "edit";
  initialData?: {
    id: string;
    name: string;
    logo_url: string;
    description: string;
    cause: string;
  };
};

export default function NGOEditor({ mode, initialData }: NGOEditorProps) {
  const router = useRouter();
  const supabase = createClient();

  const [name,        setName]        = useState(initialData?.name        ?? "");
  const [logoUrl,     setLogoUrl]     = useState(initialData?.logo_url    ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [cause,       setCause]       = useState(initialData?.cause       ?? "");
  const [status,      setStatus]      = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error,       setError]       = useState("");

  const handleSave = async () => {
    if (!name || !cause || !description) {
      setError("Name, cause and description are required.");
      return;
    }
    setError("");
    setStatus("saving");

    const payload = { name, logo_url: logoUrl, description, cause };

    if (mode === "new") {
      const { error: saveError } = await supabase.from("ngos").insert(payload);
      if (saveError) { setError(saveError.message); setStatus("error"); return; }
    } else {
      const { error: saveError } = await supabase
        .from("ngos").update(payload).eq("id", initialData!.id);
      if (saveError) { setError(saveError.message); setStatus("error"); return; }
    }

    setStatus("success");
    setTimeout(() => router.push("/admin/ngos"), 1000);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this NGO? This will also affect any linked products.")) return;
    await supabase.from("ngos").delete().eq("id", initialData!.id);
    router.push("/admin/ngos");
  };

  const inputClass = "px-3.5 py-2.5 text-[14px] border border-surface-100 rounded-[10px] bg-white text-surface-400 outline-none placeholder:text-surface-200 focus:border-primary-300 focus:ring-[3px] focus:ring-primary-300/10 transition-all w-full";
  const labelClass = "text-[12px] font-medium tracking-[0.02em] text-surface-300";

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">

      {/* ── Top bar ── */}
      <header className="h-[60px] bg-white border-b border-surface-100 flex items-center justify-between px-8 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/ngos")}
            className="flex items-center gap-1.5 text-[13px] text-surface-300 hover:text-surface-400 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            All NGOs
          </button>
          <span className="text-surface-200">/</span>
          <span className="text-[13px] font-medium text-surface-400">
            {mode === "new" ? "New NGO" : "Edit NGO"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {mode === "edit" && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-medium text-white bg-primary-300 shadow-[0_2px_0_#2D5016,0_4px_12px_rgba(45,80,22,0.25)] hover:shadow-[0_3px_0_#2D5016,0_6px_16px_rgba(45,80,22,0.3)] hover:-translate-y-px transition-all disabled:opacity-50"
          >
            {status === "saving" ? "Saving..." : status === "success" ? "Saved ✓" : mode === "new" ? "Add NGO" : "Save changes"}
          </button>
        </div>
      </header>

      {/* ── Form ── */}
      <main className="max-w-[640px] mx-auto w-full px-6 py-12 flex flex-col gap-6">
        <div>
          <h1 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-surface-400 mb-1">
            {mode === "new" ? "New nonprofit" : "Edit nonprofit"}
          </h1>
          <p className="text-[13px] text-surface-300">
            Verified nonprofits appear in the directory and are linked to their products.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-[13px] text-red-600">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Organisation name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g. WWF India" className={inputClass} />
        </div>

        {/* Cause */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Cause</label>
          <div className="flex flex-wrap gap-2">
            {Cause.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setCause(c.label)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
                  cause === c.label
                    ? "bg-primary-300 border-primary-300 text-white shadow-[0_2px_0_#2D5016,0_4px_12px_rgba(45,80,22,0.25)]"
                    : "bg-white border-surface-100 text-surface-300 hover:border-primary-200 hover:text-primary-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Description</label>
          <textarea
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this nonprofit does and why it matters..."
            rows={4}
            className={inputClass + " resize-y leading-[1.6]"}
          />
        </div>

        {/* Logo URL */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Logo URL</label>
          <input type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://..." className={inputClass} />
          {logoUrl && (
            <div className="mt-2 w-16 h-16 rounded-full border border-surface-100 overflow-hidden bg-white flex items-center justify-center">
              <img
                src={logoUrl} alt="Logo preview"
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}