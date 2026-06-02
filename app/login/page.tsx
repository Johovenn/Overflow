import Image from "next/image";
import { ChevronRight, KeyRound, ShieldCheck } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function loginAction(formData: FormData) {
	"use server";

	const code = formData.get("code");

	if (code !== process.env.COMMITTEE_SECRET_CODE) {
		redirect("/login?error=invalid");
	}

	const cookieStore = await cookies();

	cookieStore.set("colorless_access", "granted", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
	});

	redirect("/committee-links");
}

export default async function LoginPage({
	searchParams,
}: {
	searchParams?: Promise<{ error?: string }>;
}) {
	const cookieStore = await cookies();
	const access = cookieStore.get("colorless_access")?.value;

	if (access === "granted") {
		redirect("/committee-links");
	}

	const params = await searchParams;
	const hasError = params?.error === "invalid";

	return (
		<main className="relative min-h-screen overflow-hidden bg-black px-6 text-white">
			<div className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
				<div className="absolute top-80 -right-24 h-80 w-80 rounded-full bg-green-400/20 blur-3xl" />
				<div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
			</div>

			<section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6">
				<Image
					src="/overflow-logo.png"
					alt="Overflow"
					width={360}
					height={120}
					priority
					className="mb-8 h-auto w-56 drop-shadow-lg"
				/>

				<div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-400/30">
					<ShieldCheck size={28} />
				</div>

				<div className="relative w-full rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-cyan-400/10">
					<div className="absolute -right-1 -top-1 h-12 w-12 rounded-tr-3xl border-r-2 border-t-2 border-cyan-400" />
					<div className="absolute -bottom-1 -left-1 h-12 w-12 rounded-bl-3xl border-b-2 border-l-2 border-green-400" />

					<p className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-300">
						Secret Code Phrase
					</p>

					<form action={loginAction} className="space-y-5">
						<div className="flex items-center gap-3 border-b border-cyan-400/70 bg-black/40 px-3 py-4">
							<KeyRound size={18} className="text-cyan-300" />

							<input
								type="password"
								name="code"
								placeholder="••••••••••••"
								required
								className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
							/>
						</div>

						{hasError && (
							<p className="text-sm font-semibold text-red-400">
								Invalid secret code.
							</p>
						)}

						<button
							type="submit"
							className="flex w-full items-center justify-center rounded-2xl bg-green-400 px-6 py-4 text-lg font-bold text-black shadow-lg shadow-green-400/40 transition hover:scale-105 hover:bg-green-300"
						>
							Enter Code
							<ChevronRight size={24} />
						</button>
					</form>
				</div>

				<div className="mt-6 text-center">
					<p className="text-xs font-bold uppercase tracking-widest text-white/30">
						System Status: <span className="text-green-400">Encrypted</span>
					</p>

					<div className="mt-5 flex justify-center gap-3">
						<span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
						<span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
						<span className="h-1.5 w-1.5 rounded-full bg-cyan-400/30" />
					</div>
				</div>
			</section>
		</main>
	);
}