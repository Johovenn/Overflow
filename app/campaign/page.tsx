import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

export default function CampaignPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-8 text-white">
      {/* Background Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="absolute top-96 -right-24 h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center">
        {/* Header */}
        <div className="text-center">
          <Image
            src="/overflow-logo.png"
            alt="Overflow"
            width={420}
            height={120}
            priority
            className="mx-auto h-auto w-64 drop-shadow-lg md:w-80"
          />
        </div>

        {/* Main Content */}
        <div className="mt-14 grid items-center gap-14 lg:grid-cols-2">
          {/* Left Side */}
          <section>
            <h1 className="mt-6 max-w-xl text-5xl font-black leading-tight md:text-7xl">
              What type of
              <span className="bg-linear-to-r from-cyan-300 to-green-400 bg-clip-text text-transparent">
                {" "}
                Florian
              </span>
              <br />
              are you?
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/60 md:text-lg">
              10 pertanyaan untuk cari tahu tipe florian seperti apa yang paling menggambarkan dirimu
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Sparkles className="text-cyan-300" size={24} />

                <p className="mt-4 text-sm font-bold uppercase tracking-wide">
                  10 Stereotypes
                </p>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Unique camp stereotypes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Users className="text-green-400" size={24} />

                <p className="mt-4 text-sm font-bold uppercase tracking-wide">
                  Compatibility
                </p>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Find your most compatible stereotypes.
                </p>
              </div>

               <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Trophy className="text-yellow-300" size={24} />

                <p className="mt-4 text-sm font-bold uppercase tracking-wide">
                  Shareable
                </p>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Flex your result to your friends.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/campaign/start"
                className="flex items-center justify-center gap-3 rounded-2xl bg-green-400 px-8 py-5 text-sm font-black uppercase tracking-widest text-black shadow-lg shadow-green-400/30 transition hover:scale-105 hover:bg-green-300"
              >
                Start
                <ArrowRight size={18} />
              </Link>

              <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm font-semibold text-white/50 backdrop-blur">
                Estimated Time: 2 Minutes
              </div>
            </div>
          </section>

          {/* Right Side */}
          <section className="relative hidden lg:flex lg:justify-center">
            <div className="relative flex h-130 w-130 items-center justify-center rounded-full border border-cyan-400/20 bg-white/3 backdrop-blur">
              {/* Outer rings */}
              <div className="absolute h-115 w-115 rounded-full border border-cyan-400/10" />
              <div className="absolute h-95 w-95 rounded-full border border-green-400/10" />
              <div className="absolute h-75 w-75 rounded-full border border-cyan-300/10" />

              {/* Center core */}
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                <BrainCircuit size={70} className="text-cyan-200" />
              </div>

              {/* Floating cards */}
              <div className="absolute left-8 top-20 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 backdrop-blur">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Top Trait
                </p>

                <p className="mt-2 text-lg font-black text-green-400">
                  Human Wi-Fi
                </p>
              </div>

              <div className="absolute bottom-16 right-4 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 backdrop-blur">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Energy Type
                </p>

                <p className="mt-2 text-lg font-black text-cyan-300">
                  Pulse Energy
                </p>
              </div>

              <div className="absolute right-10 top-16 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 backdrop-blur">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Compatibility
                </p>

                <p className="mt-2 text-lg font-black text-yellow-300">
                  97%
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-14 flex justify-center">
            <p className="text-sm font-black tracking-wide text-cyan-300/70 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]">
                @jcyouthcampck7
            </p>
        </div>
      </section>
    </main>
  );
}