import Link from "next/link";
import { LucideIcon } from "lucide-react";

type LinkCardProps = {
	title: string;
	description: string;
	href: string;
	color: string;
	icon: LucideIcon;
	external?: boolean;
};

export function LinkCard({
	title,
	description,
	href,
	color,
	icon: Icon,
	external = false,
}: LinkCardProps) {
	const content = (
		<>
			<div
				className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
				style={{
					background: `linear-gradient(90deg, ${color}20, transparent)`,
				}}
			/>

			<div className="relative flex items-center justify-between rounded-3xl bg-black/70 px-5 py-5">
				<div className="flex items-center gap-4">
					<div
						className="flex h-12 w-12 items-center justify-center rounded-2xl"
						style={{
							backgroundColor: `${color}15`,
							color,
						}}
					>
						<Icon size={22} />
					</div>

					<div>
						<p className="text-base font-black">{title}</p>

						<p className="mt-1 text-xs text-white/40">
							{description}
						</p>
					</div>
				</div>

				<div
					className="text-xl transition group-hover:translate-x-1"
					style={{ color }}
				>
					→
				</div>
			</div>
		</>
	);

	if (external) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group relative overflow-hidden rounded-3xl border bg-white/5 p-px backdrop-blur transition hover:scale-[1.02]"
				style={{
					borderColor: `${color}60`,
				}}
			>
				{content}
			</a>
		);
	}

	return (
		<Link
			href={href}
			className="group relative overflow-hidden rounded-3xl border bg-white/5 p-px backdrop-blur transition hover:scale-[1.02]"
			style={{
				borderColor: `${color}60`,
			}}
		>
			{content}
		</Link>
	);
}