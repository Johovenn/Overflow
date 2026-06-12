"use client"

import Image from "next/image";

import {
	ClipboardList,
	CalendarDays,
	KeyRound,
	Trophy,
	Images,
	ShieldCheck,
	BedDouble,
} from "lucide-react";
import { LinkCard } from "../components/LinkCard";

export default function CommitteeLinksPage() {

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

				<p className="mt-4 text-center text-sm text-red-400">
					Colorless Access Only
				</p>

				<div className="mt-10 flex w-full flex-col gap-4">
					<LinkCard
						title="Rundown Panitia"
						description="Rundown • Point System • Master Code"
						href="https://drive.google.com/file/d/18ctlqJN89tq3jC3k_HZdR0c2ZfPkDAJA/view?usp=drive_link"
						color="#FF3B3B"
						icon={ClipboardList}
						external
					/>

					<LinkCard
						title="Rundown Peserta"
						description="Participant Rundown"
						href="https://drive.google.com/file/d/1AvGdclmzAZxUw1G3MYtPkMkPxyUPZtzf/view?usp=drive_link"
						color="#00D9FF"
						icon={CalendarDays}
						external
					/>

					<LinkCard
						title="Input Points"
						description="Manage scores"
						href="/points"
						color="#39FF14"
						icon={KeyRound}
					/>

					<LinkCard
						title="Score Leaderboard"
						description="Live rankings"
						href="/leaderboard"
						color="#00FF88"
						icon={Trophy}
					/>

					<LinkCard
						title="Snapshot"
						description="Relive your camp memories"
						href="https://drive.google.com/drive/folders/1slUC-IqiMfmzHFEpvNtVc2rN6o7h4Kq3"
						color="#BF00FF"
						icon={Images}
						external
					/>

					<LinkCard
						title="Rules"
						description="Camp regulations"
						href="https://drive.google.com/file/d/12GnrL3hgLWJS3PavqTiEQp_BSkqTqxyI/view?usp=drivesdk"
						color="#FF7A00"
						icon={ShieldCheck}
						external
					/>

					<LinkCard
						title="List Kamar"
						description="Room assignments"
						href="YOUR_ROOM_LIST_LINK"
						color="#FFC400"
						icon={BedDouble}
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