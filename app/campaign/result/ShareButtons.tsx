"use client";

import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { toBlob } from "html-to-image";

type ShareButtonsProps = {
	targetId: string;
	type: string;
};

export function ShareButtons({ targetId, type }: ShareButtonsProps) {
	const [busy, setBusy] = useState(false);

	async function getImageFile() {
		const element = document.getElementById(targetId);

		if (!element) {
			throw new Error("Share target not found.");
		}

		const blob = await toBlob(element, {
			cacheBust: true,
			pixelRatio: 2,
			backgroundColor: "#000000",
		});

		if (!blob) {
			throw new Error("Failed to create image.");
		}

		return new File([blob], `overflow-${type}.png`, {
			type: "image/png",
		});
	}

	async function handleShare() {
		setBusy(true);

		try {
			const file = await getImageFile();

			if (navigator.canShare?.({ files: [file] })) {
				await navigator.share({
					files: [file],
					title: "My Overflow Result",
					text: "Check out my Overflow roommate type! @jcyouthcampck7",
				});

				return;
			}

			const url = URL.createObjectURL(file);
			const a = document.createElement("a");

			a.href = url;
			a.download = file.name;
			a.click();

			URL.revokeObjectURL(url);
		} catch (error) {
			if ((error as Error).name !== "AbortError") {
				console.error(error);
			}
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className="mt-3 flex items-center gap-3">
			<button
				onClick={handleShare}
				disabled={busy}
				aria-label="Share to Instagram"
				className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:scale-105 hover:bg-white/10 disabled:opacity-50"
			>
				<FaInstagram size={20} />
			</button>

			<button
				onClick={handleShare}
				disabled={busy}
				aria-label="Share to WhatsApp"
				className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:scale-105 hover:bg-white/10 disabled:opacity-50"
			>
				<FaWhatsapp size={20} />
			</button>
		</div>
	);
}