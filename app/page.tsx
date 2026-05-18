import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Gem, Leaf, Sun, Sparkles, Trophy } from "lucide-react";

type Group = {
	id: string;
	name: string;
	clan_name: string;
	points: number;
	icon: string;
	color_hex: string;
};

const iconMap = {
	Gem,
	Leaf,
	Sun,
	Sparkles,
};

function formatPoints(points: number) {
	return points.toLocaleString("en-US");
}

export default async function HomePage() {
	const { data: groups, error } = await supabase
		.from("groups")
		.select("*")
		.order("points", { ascending: false });

	if (error) {
		console.error("Supabase leaderboard error:", error);
		return (
			<main className="flex min-h-screen items-center justify-center bg-black text-white">
				Failed to load leaderboard.
			</main>
		);
	}

	const rankedGroups = (groups ?? []) as Group[];
	const topThree = rankedGroups.slice(0, 3);

	return (
		<main className="relative min-h-screen overflow-hidden bg-black px-4 py-8 text-white">
			<div className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
				<div className="absolute top-96 -right-24 h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />
				<div className="absolute -bottom-24 left-40 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
			</div>

			<section className="relative z-10 mx-auto max-w-7xl">
				<div className="text-center">
					<Image
						src="/overflow-logo.png"
						alt="Overflow"
						width={420}
						height={120}
						priority
						className="mx-auto h-auto w-64 drop-shadow-lg md:w-80"
					/>

					<div className="mx-auto mt-5 w-fit rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1 text-xs font-bold uppercase tracking-wide text-green-400">
						● Live Standings
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-12 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
					<section className="flex flex-col">
						<p className="mb-8 text-sm font-black uppercase tracking-widest text-cyan-400">
							Top Performing Groups
						</p>

						<div className="flex items-end justify-center gap-2 md:gap-4">
							{topThree.map((group, index) => {
								const Icon =
									iconMap[group.icon as keyof typeof iconMap] ?? Trophy;

								const isFirst = index === 0;

								return (
									<div
										key={group.id}
										className={`relative flex flex-col items-center ${
											isFirst
												? "order-2"
												: index === 1
													? "order-1"
													: "order-3"
										}`}
									>
										<div
											className={`flex items-center justify-center rounded-full border shadow-lg ${
												isFirst
													? "h-28 w-28 md:h-44 md:w-44"
													: "h-20 w-20 md:h-32 md:w-32"
											}`}
											style={{
												borderColor: group.color_hex,
												boxShadow: `0 0 28px ${group.color_hex}`,
												color: group.color_hex,
											}}
										>
											<Icon size={isFirst ? 58 : 42} />
										</div>

										<div
											className="absolute rounded-full px-3 py-1 text-sm font-black text-black"
											style={{
												backgroundColor: group.color_hex,
												top: isFirst ? "12px" : "8px",
												right: isFirst ? "-8px" : "-10px",
											}}
										>
											#{index + 1}
										</div>

										<div
											className={`mt-4 flex flex-col items-center justify-center rounded-t-3xl border bg-white/5 px-3 text-center backdrop-blur ${
												isFirst
													? "h-52 w-28 md:h-80 md:w-48"
													: "h-40 w-24 md:h-64 md:w-40"
											}`}
											style={{
												borderColor: `${group.color_hex}60`,
												boxShadow: `0 0 24px ${group.color_hex}30`,
											}}
										>
											<p
												className="text-sm font-black uppercase md:text-lg"
												style={{ color: group.color_hex }}
											>
												{group.name}
											</p>

											<p className="mt-2 text-xs uppercase text-white/40 md:text-sm">
												{group.clan_name}
											</p>

											<div
												className="mt-4 h-px w-12 md:mt-5 md:w-16"
												style={{
													backgroundColor: `${group.color_hex}60`,
												}}
											/>

											<p className="mt-4 text-xl font-black md:text-3xl">
												{formatPoints(group.points)}
											</p>

											<p className="mt-2 text-xs uppercase tracking-widest text-white/30">
												Points
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</section>

					<section>
						<div className="flex items-center justify-between">
							<p className="text-sm font-black uppercase tracking-widest text-cyan-400">
								Full Rankings
							</p>

							<p className="text-xs uppercase tracking-widest text-white/30">
								20 Groups
							</p>
						</div>

						<div className="mt-6 space-y-3">
							{rankedGroups.map((group, index) => {
								const Icon =
									iconMap[group.icon as keyof typeof iconMap] ?? Trophy;

								return (
									<div
										key={group.id}
										className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur md:px-5 md:py-4"
									>
										<div className="flex items-center gap-4">
											<p
												className="w-6 text-lg font-black"
												style={{
													color: index < 3 ? group.color_hex : "#888888",
												}}
											>
												{index + 1}
											</p>

											<div
												className="flex h-12 w-12 items-center justify-center rounded-xl border"
												style={{
													color: group.color_hex,
													borderColor: `${group.color_hex}80`,
													boxShadow: `0 0 14px ${group.color_hex}40`,
												}}
											>
												<Icon size={24} />
											</div>

											<div>
												<h2 className="text-sm font-bold uppercase md:text-base">
													{group.name}
												</h2>

												<p className="text-xs uppercase tracking-wide text-white/35">
													{group.clan_name}
												</p>
											</div>
										</div>

										<div className="text-right">
											<p className="text-lg font-black md:text-xl">
												{formatPoints(group.points)}
											</p>

											<p className="text-xs uppercase tracking-wide text-white/30">
												Points
											</p>
										</div>
									</div>
								);
							})}
						</div>

						<a
							href="/login"
							className="mx-auto mt-8 block w-64 rounded-full bg-green-400 py-4 text-center text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-green-400/40 transition hover:bg-green-300"
						>
							Colorless Login
						</a>
					</section>
				</div>
			</section>
		</main>
	);
}