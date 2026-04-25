import { supabase } from "@/lib/supabase";
import { Gem, Leaf, Sun, Sparkles, Trophy } from "lucide-react";
import Image from "next/image";

type Clan = {
  id: string;
  name: string;
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
  const { data: clans, error } = await supabase
    .from("clans")
    .select("*")
    .order("points", { ascending: false });

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Failed to load leaderboard.
      </main>
    );
  }

  const rankedClans = (clans ?? []) as Clan[];
  const topThree = rankedClans.slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050608] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Blue blob */}
        <div className="absolute -top-20 -left-20 h-75 w-75 rounded-full bg-cyan-400/30 blur-[120px] animate-[floatBlob_8s_ease-in-out_infinite]" />

        {/* Green blob */}
        <div className="absolute top-[40%] -right-25 h-87.5 w-87.5 rounded-full bg-green-400/30 blur-[140px] animate-[floatBlob_8s_ease-in-out_infinite]" />

        {/* Extra subtle glow */}
        <div className="absolute -bottom-25 left-[20%] h-75 w-75 rounded-full bg-cyan-300/20 blur-[140px] animate-[floatBlob_8s_ease-in-out_infinite]" />
      </div>

      <section className="relative z-10 mx-auto max-w-md">
        <section className="mx-auto max-w-md">
          <Image
            src="/overflow-logo.png"
            alt="Overflow"
            width={180}
            height={100}
            priority
            className="mx-auto h-auto w-60 drop-shadow-[0_0_18px_rgba(103,232,249,0.9)] md:w-80"
          />

          <div className="mx-auto mt-5 w-fit rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1 text-[10px] font-bold uppercase tracking-wide text-green-400">
            ● Live Standings
          </div>

          <section className="mt-10 flex items-end justify-center gap-3">
            {topThree.map((clan, index) => {
              const Icon = iconMap[clan.icon as keyof typeof iconMap] ?? Trophy;
              const isFirst = index === 0;

              return (
                <div
                  key={clan.id}
                  className={`relative flex flex-col items-center ${
                    isFirst ? "order-2" : index === 1 ? "order-1" : "order-3"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center rounded-full border shadow-lg ${
                      isFirst ? "h-24 w-24" : "h-16 w-16"
                    }`}
                    style={{
                      borderColor: clan.color_hex,
                      boxShadow: `0 0 24px ${clan.color_hex}`,
                      color: clan.color_hex,
                    }}
                  >
                    <Icon size={isFirst ? 52 : 34} />
                  </div>

                  <div
                    className="absolute rounded-full px-2 py-1 text-[10px] font-black text-black"
                    style={{
                      backgroundColor: clan.color_hex,
                      bottom: isFirst ? "76px" : "48px",
                      right: isFirst ? "-4px" : "-8px",
                    }}
                  >
                    {index + 1}
                    {index === 0 ? "st" : index === 1 ? "nd" : "rd"}
                  </div>

                  <div
                    className={`mt-3 w-23 rounded-t-2xl border bg-white/3 px-2 py-5 text-center ${
                      isFirst ? "h-36" : "h-28"
                    }`}
                    style={{
                      borderColor: `${clan.color_hex}60`,
                      boxShadow: isFirst ? `0 0 22px ${clan.color_hex}50` : "",
                    }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase"
                      style={{ color: clan.color_hex }}
                    >
                      {clan.name}
                    </p>
                    <p className="mt-2 text-lg font-bold">
                      {formatPoints(clan.points)}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          <p className="mt-10 text-xs uppercase tracking-[0.25em] text-white/30">
            Florians Leaderboard
          </p>

          <section className="mt-4 space-y-3">
            {rankedClans.map((clan, index) => {
              const Icon = iconMap[clan.icon as keyof typeof iconMap] ?? Trophy;

              return (
                <div
                  key={clan.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 px-4 py-3"
                >
                  <div className="flex items-center gap-4">
                    <p
                      className="w-4 text-sm font-bold"
                      style={{ color: index < 3 ? clan.color_hex : "#888" }}
                    >
                      {index + 1}
                    </p>

                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg border"
                      style={{
                        color: clan.color_hex,
                        borderColor: `${clan.color_hex}80`,
                        boxShadow: `0 0 12px ${clan.color_hex}50`,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold uppercase">
                        {clan.name}
                      </h2>
                      <p className="text-[9px] uppercase tracking-wide text-white/35">
                        {index === 0
                          ? "Elder Rank"
                          : index === 1
                          ? "Rising"
                          : index === 2
                          ? "Steady"
                          : "Last Activity"}
                      </p>
                    </div>
                  </div>

                  <p className="text-right text-sm font-semibold">
                    {formatPoints(clan.points)}
                  </p>
                </div>
              );
            })}
          </section>

          <a
            href="/login"
            className="mx-auto mt-8 block w-full max-w-65 rounded-full bg-[#21ff00] py-4 text-center text-xs font-black uppercase tracking-[0.35em] text-black shadow-[0_0_24px_rgba(33,255,0,0.55)]"
          >
            Colorless Login
          </a>

          <p className="mt-4 text-center text-[9px] uppercase tracking-[0.25em] text-white/20">
            Colorless Access Only
          </p>
        </section>
      </section>
    </main>
  );
}