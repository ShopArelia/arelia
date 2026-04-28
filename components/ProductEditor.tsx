"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type NGOOption = { id: string; name: string };

type ProductEditorProps = {
  mode: "new" | "edit";
  ngos: NGOOption[];
  initialData?: {
    id: string;
    title: string;
    image_url: string;
    ngo_id: string;
    external_link: string;
    price: number;
  };
};

export default function ProductEditor({ mode, ngos, initialData }: ProductEditorProps) {
  const router = useRouter();
  const supabase = createClient();

  const [title,        setTitle]        = useState(initialData?.title        ?? "");
  const [imageUrl,     setImageUrl]     = useState(initialData?.image_url    ?? "");
  const [ngoId,        setNgoId]        = useState(initialData?.ngo_id       ?? "");
  const [externalLink, setExternalLink] = useState(initialData?.external_link ?? "");
  const [price,        setPrice]        = useState<number>(initialData?.price ?? 0);
  const [status,       setStatus]       = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error,        setError]        = useState("");

  const handleSave = async () => {
    if (!title || !ngoId || !externalLink || price <= 0) {
      setError("Title, NGO, external link and a valid price are required.");
      return;
    }
    setError("");
    setStatus("saving");

    const payload = { title, image_url: imageUrl, ngo_id: ngoId, external_link: externalLink, price };

    if (mode === "new") {
      const { error: saveError } = await supabase.from("products").insert(payload);
      if (saveError) { setError(saveError.message); setStatus("error"); return; }
    } else {
      const { error: saveError } = await supabase
        .from("products").update(payload).eq("id", initialData!.id);
      if (saveError) { setError(saveError.message); setStatus("error"); return; }
    }

    setStatus("success");
    setTimeout(() => router.push("/admin/products"), 1000);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product permanently?")) return;
    await supabase.from("products").delete().eq("id", initialData!.id);
    router.push("/admin/products");
  };

  const inputClass = "px-3.5 py-2.5 text-[14px] border border-surface-100 rounded-[10px] bg-white text-surface-400 outline-none placeholder:text-surface-200 focus:border-primary-300 focus:ring-[3px] focus:ring-primary-300/10 transition-all w-full";
  const labelClass = "text-[12px] font-medium tracking-[0.02em] text-surface-300";

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">

      {/* ── Top bar ── */}
      <header className="h-[60px] bg-white border-b border-surface-100 flex items-center justify-between px-8 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/products")}
            className="flex items-center gap-1.5 text-[13px] text-surface-300 hover:text-surface-400 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            All products
          </button>
          <span className="text-surface-200">/</span>
          <span className="text-[13px] font-medium text-surface-400">
            {mode === "new" ? "New product" : "Edit product"}
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
            {status === "saving" ? "Saving..." : status === "success" ? "Saved ✓" : mode === "new" ? "Add product" : "Save changes"}
          </button>
        </div>
      </header>

      {/* ── Form ── */}
      <main className="max-w-[640px] mx-auto w-full px-6 py-12 flex flex-col gap-6">
        <div>
          <h1 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-surface-400 mb-1">
            {mode === "new" ? "New product" : "Edit product"}
          </h1>
          <p className="text-[13px] text-surface-300">
            Products link directly to the nonprofit's own store.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-[13px] text-red-600">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Product name" className={inputClass} />
        </div>

        {/* NGO */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Nonprofit (NGO)</label>
          <select
            value={ngoId} onChange={(e) => setNgoId(e.target.value)}
            className={inputClass + " appearance-none cursor-pointer"}
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B4B2A9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
          >
            <option value="" disabled>Select an NGO</option>
            {ngos.map((ngo) => (
              <option key={ngo.id} value={ngo.id}>{ngo.name}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-surface-200">$</span>
            <input
              type="number" min={0} step={0.01} value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="0.00"
              className={inputClass + " pl-7"}
            />
          </div>
        </div>

        {/* External link */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>External link</label>
          <input type="url" value={externalLink} onChange={(e) => setExternalLink(e.target.value)}
            placeholder="https://nonprofit-store.com/product" className={inputClass} />
          <p className="text-[11px] text-surface-200">
            The buyer will be taken directly to this URL when they click "Buy now".
          </p>
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Image URL</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..." className={inputClass} />
          {imageUrl && (
            <img
              src={imageUrl} alt="Preview"
              className="mt-2 w-full max-h-[240px] object-cover rounded-md border border-surface-100"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          )}
        </div>
      </main>
    </div>
  );
}