import Image from "next/image";

import {
	CalendarDays,
	Trophy,
	Images,
	ShieldCheck,
	BedDouble,
	Users,
} from "lucide-react";
import { LinkCard } from "../components/LinkCard";

export default function LinksPage() {
	return (
		<main className="relative min-h-screen overflow-hidden bg-black px-5 py-10 text-white">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
				<div className="absolute top-72 -right-24 h-80 w-80 rounded-full bg-green-400/20 blur-3xl" />
				<div className="absolute bottom-0 left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
			</div>

			<section className="relative z-10 mx-auto flex max-w-md flex-col items-center">
				<Image
					src="/overflow-logo.png"
					alt="Overflow"
					width={400}
					height={120}
					priority
					className="h-auto w-52 md:w-64"
				/>

				<p className="mt-4 text-center text-sm text-white/60">
					JC Youth Camp 2025
				</p>

				<div className="mt-10 flex w-full flex-col gap-4">
					<LinkCard
						title="Rundown"
						description="Event schedule"
						href="https://drive.google.com/file/d/1AvGdclmzAZxUw1G3MYtPkMkPxyUPZtzf/view?usp=drive_link"
						color="#00D9FF"
						icon={CalendarDays}
						external
					/>

					<LinkCard
						title="Leaderboard Score"
						description="View all group live rankings"
						href="/leaderboard"
						color="#39FF14"
						icon={Trophy}
					/>

					<LinkCard
						title="Snapshot"
						description="Relive your camp memories"
						href="https://drive.google.com/drive/folders/1Wi1wBeIK8kBxxyRqo2rbMHBTi5EzKVfr"
						color="#BF00FF"
						icon={Images}
						external
					/>

					<LinkCard
						title="Monochrome District Rules & Points"
						description="Make sure you don't break any rules!"
						href="https://drive.google.com/file/d/1mtkTPzw59NsS4E-xytdwwLDOMWHyKviq/view?usp=sharing"
						color="#FF7A00"
						icon={ShieldCheck}
						external
					/>

					<LinkCard
						title="List Kamar"
						description="Room assignments"
						href="https://drive.google.com/file/d/1nUoaucqbo4_mP0FoVw0XLytRKEME5be-/view?usp=sharing"
						color="#FFC400"
						icon={BedDouble}
						external
					/>

					<LinkCard
						title="Pembagian Kelompok"
						description="View all groups and members"
						href="https://drive.google.com/file/d/1JHGbGjIy1iCKS-6iPF9QfPfakaAXQiu6/view?usp=sharing"
						color="#d4ff00"
						icon={Users}
						external
					/>
				</div>

				<p className="mt-12 text-sm text-white/40">
					@jcyouthcampck7
				</p>
			</section>
		</main>
	);
}