import Image from "next/image";
import {
	Bed,
	BookOpen,
	Camera,
	Compass,
	Music,
	Sparkles,
	Trophy,
	Utensils,
	Wifi,
	Zap,
} from "lucide-react";
import {
	getStereotypeById,
	stereotypes,
	type StereotypeId,
} from "@/lib/campaign-data";
import { ShareButtons } from "./ShareButtons";

const iconMap = {
	Zap,
	Music,
	BookOpen,
	Utensils,
	Bed,
	Camera,
	Compass,
	Sparkles,
	Trophy,
	Wifi,
};

const stereotypeColors: Record<StereotypeId, string> = {
	"pulse-energy": "#00D9FF",
	"harmony-fan": "#39FF14",
	"deep-listeners": "#00D9FF",
	"fuel-squad": "#FFC400",
	"sloth-supremacy": "#BF00FF",
	shutterbug: "#00D9FF",
	pathfinders: "#39FF14",
	"high-maintenance-peeps": "#FFC400",
	"ambis-arc": "#39FF14",
	"human-wifi": "#00D9FF",
};

export default async function CampaignResultPage({
	searchParams,
}: {
	searchParams: Promise<{ type?: string }>;
}) {
	const params = await searchParams;
	const type = (params.type ?? "pulse-energy") as StereotypeId;

	const stereotype = stereotypes[type] ?? stereotypes["pulse-energy"];
	const themeColor = stereotypeColors[stereotype.id];

	const MainIcon = iconMap[stereotype.icon as keyof typeof iconMap];

	const compatibleStereotypes = stereotype.compatibleWith.map((id) =>
		getStereotypeById(id)
	);

	return (
		<main className="relative min-h-screen overflow-hidden bg-black px-5 text-white">
			<div className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
				<div className="absolute top-72 -right-24 h-80 w-80 rounded-full bg-green-400/20 blur-3xl" />
				<div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
			</div>

			<section className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center py-4">
				{/* Visible Result Page */}
				<div className="flex w-full flex-col items-center text-white">
					<Image
						src="/overflow-logo.png"
						alt="Overflow"
						width={320}
						height={100}
						priority
						className="h-auto w-36 drop-shadow-[0_0_24px_rgba(163,230,53,0.45)] md:w-44"
					/>

					<h1 className="mt-4 text-center text-4xl font-black leading-tight md:text-6xl">
						{stereotype.name}
					</h1>

					<p className="mt-2 text-center text-sm italic leading-relaxed text-white/75 md:text-xl">
						{stereotype.shortDescription}
					</p>

					<div
						className="mt-6 flex h-24 w-24 items-center justify-center rounded-full border-2 bg-black/50 backdrop-blur md:h-32 md:w-32"
						style={{
							borderColor: themeColor,
							boxShadow: `
								0 0 22px ${themeColor}40,
								inset 0 0 16px rgba(255,255,255,0.03)
							`,
						}}
					>
						<MainIcon
							size={46}
							style={{
								color: themeColor,
								filter: `drop-shadow(0 0 10px ${themeColor})`,
							}}
						/>
					</div>

					<div
						className="mt-6 w-full rounded-3xl border-2 bg-black/50 px-5 py-5 backdrop-blur md:px-8 md:py-6"
						style={{
							borderColor: themeColor,
							boxShadow: `
								0 0 16px ${themeColor}30,
								inset 0 0 16px rgba(255,255,255,0.03)
							`,
						}}
					>
						<p className="text-sm font-medium leading-7 text-white/90 md:text-lg md:leading-8">
							{stereotype.longDescription}
						</p>
					</div>

					<div className="mt-7 text-center">
						<p className="text-base italic text-white/80 md:text-xl">
							Your Most Compatible Roommates Are
						</p>

						<div className="mt-5 flex items-end justify-center gap-3 md:gap-5">
							{compatibleStereotypes.map((compatible, index) => {
								const CompatibleIcon =
									iconMap[compatible.icon as keyof typeof iconMap];

								const compatibleColor = stereotypeColors[compatible.id];
								const isCenter = index === 1;

								return (
									<div
										key={compatible.id}
										className={`flex flex-col items-center text-center ${
											isCenter ? "w-24 md:w-28" : "w-20 md:w-24"
										}`}
									>
										<div
											className={`flex items-center justify-center rounded-full border-2 bg-black/50 backdrop-blur ${
												isCenter
													? "h-20 w-20 md:h-24 md:w-24"
													: "h-14 w-14 md:h-16 md:w-16"
											}`}
											style={{
												borderColor: compatibleColor,
												boxShadow: `
													0 0 16px ${compatibleColor}30,
													inset 0 0 14px rgba(255,255,255,0.03)
												`,
											}}
										>
											<CompatibleIcon
												size={isCenter ? 36 : 24}
												style={{
													color: compatibleColor,
													filter: `drop-shadow(0 0 8px ${compatibleColor})`,
												}}
											/>
										</div>

										<div
											className={`mt-2 flex items-start justify-center ${
												isCenter ? "h-12 md:h-14" : "h-10 md:h-12"
											}`}
										>
											<p
												className={`font-semibold leading-snug text-white/85 ${
													isCenter
														? "text-sm md:text-base"
														: "text-xs md:text-sm"
												}`}
											>
												{compatible.name}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<p className="mt-6 text-center text-lg font-black text-white md:text-2xl">
						@jcyouthcampck7
					</p>
				</div>

				{/* Hidden Share Image Card — iOS-safe version */}
				<div className="pointer-events-none fixed -left-2500 top-0">
					<div
						id="result-card"
						className="relative flex w-97.5 flex-col items-center overflow-hidden bg-black px-8 pb-32 pt-8 text-white"
						style={{
							aspectRatio: "9 / 16",
							background:
								"radial-gradient(circle at 12% 8%, rgba(0, 217, 255, 0.34) 0, rgba(0, 217, 255, 0.18) 16%, transparent 36%), radial-gradient(circle at 88% 32%, rgba(57, 255, 20, 0.28) 0, rgba(57, 255, 20, 0.12) 18%, transparent 42%), radial-gradient(circle at 10% 82%, rgba(57, 255, 20, 0.22) 0, rgba(57, 255, 20, 0.10) 20%, transparent 44%), radial-gradient(circle at 90% 76%, rgba(0, 217, 255, 0.20) 0, rgba(0, 217, 255, 0.10) 18%, transparent 40%), #000000",
						}}
					>
						<div className="relative z-10 flex w-full flex-col items-center">
							<Image
								src="/overflow-logo.png"
								alt="Overflow"
								width={320}
								height={100}
								priority
								className="h-auto w-32"
							/>

							<h1 className="mt-3 text-center text-3xl font-black leading-tight">
								{stereotype.name}
							</h1>

							<p className="mt-2 text-center text-xs italic leading-relaxed text-white/75">
								{stereotype.shortDescription}
							</p>

							<div
								className="mt-5 flex h-20 w-20 items-center justify-center rounded-full border bg-black/40"
								style={{
									borderColor: themeColor,
									background: `radial-gradient(circle, ${themeColor}22 0%, rgba(0,0,0,0.72) 58%)`,
								}}
							>
								<MainIcon
									size={38}
									style={{
										color: themeColor,
									}}
								/>
							</div>

							<div
								className="mt-5 w-full rounded-3xl border bg-black/45 px-5 py-4"
								style={{
									borderColor: themeColor,
									background: `linear-gradient(135deg, rgba(0,0,0,0.74), ${themeColor}12)`,
								}}
							>
								<p className="text-sm font-medium leading-7 text-white/90">
									{stereotype.longDescription}
								</p>
							</div>

							<div className="mt-6 text-center">
								<p className="text-sm italic text-white/80">
									Your Most Compatible Roommates Are
								</p>

								<div className="mt-4 flex items-end justify-center gap-4">
									{compatibleStereotypes.map((compatible, index) => {
										const CompatibleIcon =
											iconMap[compatible.icon as keyof typeof iconMap];

										const compatibleColor = stereotypeColors[compatible.id];
										const isCenter = index === 1;

										return (
											<div
												key={compatible.id}
												className={`flex flex-col items-center text-center ${
													isCenter ? "w-24" : "w-20"
												}`}
											>
												<div
													className={`flex items-center justify-center rounded-full border bg-black/45 ${
														isCenter ? "h-16 w-16" : "h-12 w-12"
													}`}
													style={{
														borderColor: compatibleColor,
														background: `radial-gradient(circle, ${compatibleColor}22 0%, rgba(0,0,0,0.72) 60%)`,
													}}
												>
													<CompatibleIcon
														size={isCenter ? 30 : 22}
														style={{
															color: compatibleColor,
														}}
													/>
												</div>

												<div className="mt-2 flex h-10 items-start justify-center">
													<p className="text-xs font-semibold leading-snug text-white/85">
														{compatible.name}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>

							<div className="mt-10 h-28 w-full" />
						</div>
					</div>
				</div>

				<div className="mt-7 flex flex-col items-center">
					<p className="text-lg font-medium">Share</p>
					<ShareButtons targetId="result-card" type={stereotype.id} />
				</div>
			</section>
		</main>
	);
}