"use client";

import { useState } from "react";

export function ShareButtons({ type }: { type: string }) {
  const [busy, setBusy] = useState(false);

  const getFile = async () => {
    const res = await fetch(`/api/share-image?type=${type}`);
    const blob = await res.blob();
    return new File([blob], `overflow-${type}.png`, { type: "image/png" });
  };

  const handleNativeShare = async () => {
    setBusy(true);
    try {
      const file = await getFile();
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Overflow Result",
          text: "Check out my Overflow roommate type! @jcyouthcampck7",
        });
      } else {
        // Desktop / unsupported — fall back to download
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") console.error(err);
    } finally {
      setBusy(false);
    }
  };

  const handleWhatsApp = async () => {
    // WhatsApp Web Share API works the same — but if you want a direct link
    // without the share sheet, use wa.me (text only, no image attachment from web)
    handleNativeShare();
  };

  return (
    <div className="mt-3 flex items-center gap-3">
      <button
        onClick={handleNativeShare}
        disabled={busy}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold backdrop-blur transition hover:bg-white/10 disabled:opacity-50"
      >
        {busy ? "Preparing..." : "Instagram"}
      </button>
      <button
        onClick={handleWhatsApp}
        disabled={busy}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold backdrop-blur transition hover:bg-white/10 disabled:opacity-50"
      >
        WhatsApp
      </button>
    </div>
  );
}