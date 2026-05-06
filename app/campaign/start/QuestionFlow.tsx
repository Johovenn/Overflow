"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { questions, type StereotypeId } from "@/lib/campaign-data";

const questionColors = [
	"#00D9FF", // Sapphire
	"#FFC400", // Citrine
	"#39FF14", // Emerald
	"#BF00FF", // Amethyst
];

function getQuestionColor(index: number) {
	return questionColors[index % questionColors.length];
}

function calculateResult(answers: StereotypeId[]) {
	const scores = new Map<StereotypeId, number>();

	for (const answer of answers) {
		scores.set(answer, (scores.get(answer) ?? 0) + 1);
	}

	let result = answers[0];

	for (const answer of answers) {
		if ((scores.get(answer) ?? 0) > (scores.get(result) ?? 0)) {
			result = answer;
		}
	}

	return result;
}

export default function QuestionFlow() {
	const router = useRouter();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<StereotypeId[]>([]);
	const [isChoosing, setIsChoosing] = useState(false);

	const currentQuestion = questions[currentQuestionIndex];
	const themeColor = getQuestionColor(currentQuestionIndex);
	const progress = currentQuestionIndex + 1;

	function handleChoose(stereotypeId: StereotypeId) {
		if (isChoosing) return;

		setIsChoosing(true);

		const nextAnswers = [...selectedAnswers, stereotypeId];

		setTimeout(() => {
			if (currentQuestionIndex === questions.length - 1) {
				const result = calculateResult(nextAnswers);

				localStorage.setItem("overflow-campaign-result", result);
				localStorage.setItem(
					"overflow-campaign-answers",
					JSON.stringify(nextAnswers)
				);

				router.push(`/campaign/result?type=${result}`);
				return;
			}

			setSelectedAnswers(nextAnswers);
			setCurrentQuestionIndex((value) => value + 1);
			setIsChoosing(false);
		}, 220);
	}

	return (
		<main className="relative min-h-screen overflow-hidden bg-black px-5 py-6 text-white">
			<div className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
				<div className="absolute top-72 -right-24 h-80 w-80 rounded-full bg-green-400/20 blur-3xl" />
				<div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
			</div>

			<section className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center pt-6">
				<Image
					src="/overflow-logo.png"
					alt="Overflow"
					width={320}
					height={100}
					priority
					className="h-auto w-44 drop-shadow-[0_0_24px_rgba(163,230,53,0.45)] md:w-56"
				/>

				<div
					className="relative mt-12 w-full rounded-3xl bg-black/50 px-6 py-10 text-center backdrop-blur md:px-12 md:py-12"
					style={{
                        boxShadow: `
                            0 0 18px ${themeColor}25,
                            inset 0 0 20px rgba(255,255,255,0.03)
                        `,
                    }}
				>
					<p className="mx-auto mt-3 max-w-xl text-xl leading-relaxed md:text-3xl md:leading-snug">
						{currentQuestion.question}
					</p>
				</div>

				<div className="mt-8 grid w-full grid-cols-2 gap-4 md:gap-5">
					{currentQuestion.answers.slice(0, 4).map((answer) => (
						<button
							key={answer.label}
							type="button"
							disabled={isChoosing}
							onClick={() => handleChoose(answer.stereotypeId)}
							className="flex min-h-24 items-center justify-center rounded-2xl border bg-black/50 px-4 py-4 text-center text-sm leading-relaxed text-white backdrop-blur transition hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60 md:min-h-28 md:px-6 md:text-lg"
							style={{
								borderColor: themeColor,
								boxShadow: `
									0 0 14px ${themeColor}30,
									inset 0 0 18px rgba(255,255,255,0.03)
								`,
							}}
						>
							{answer.text}
						</button>
					))}
				</div>

				<div className="mt-5 flex w-full justify-center">
					<button
						type="button"
						disabled={isChoosing}
						onClick={() => handleChoose(currentQuestion.answers[4].stereotypeId)}
						className="flex min-h-24 w-full max-w-sm items-center justify-center rounded-2xl border bg-black/50 px-4 py-4 text-center text-sm leading-relaxed text-white backdrop-blur transition hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60 md:min-h-28 md:max-w-md md:px-6 md:text-lg"
						style={{
							borderColor: themeColor,
							boxShadow: `
								0 0 14px ${themeColor}30,
								inset 0 0 18px rgba(255,255,255,0.03)
							`,
						}}
					>
						{currentQuestion.answers[4].text}
					</button>
				</div>

				<div className="mt-8 w-full">
					<div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/35">
						<span>Scanner Progress</span>
						<span>
							{progress}/{questions.length}
						</span>
					</div>

					<div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
						<div
							className="h-full rounded-full transition-all duration-300"
							style={{
								width: `${(progress / questions.length) * 100}%`,
								backgroundColor: themeColor,
								boxShadow: `0 0 16px ${themeColor}`,
							}}
						/>
					</div>
				</div>
			</section>
		</main>
	);
}