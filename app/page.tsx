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
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Failed to load leaderboard.
      </main>
    );
  }

  const rankedGroups = (groups ?? []) as Group[];
  const topThree = rankedGroups.slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-96 -right-24 h-80 w-80 rounded-full bg-green-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto max-w-md">
        <Image
          src="/overflow-logo.png"
          alt="Overflow"
          width={360}
          height={120}
          priority
          className="mx-auto h-auto w-64 drop-shadow-lg"
        />

        <div className="mx-auto mt-5 w-fit rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1 text-xs font-bold uppercase tracking-wide text-green-400">
          ● Live Standings
        </div>

        <section className="mt-10 flex items-end justify-center gap-3">
          {topThree.map((group, index) => {
            const Icon = iconMap[group.icon as keyof typeof iconMap] ?? Trophy;
            const isFirst = index === 0;

            return (
              <div
                key={group.id}
                className={`relative flex flex-col items-center ${
                  isFirst ? "order-2" : index === 1 ? "order-1" : "order-3"
                }`}
              >
                <div
                  className={`flex items-center justify-center rounded-full border shadow-lg ${
                    isFirst ? "h-24 w-24" : "h-16 w-16"
                  }`}
                  style={{
                    borderColor: group.color_hex,
                    boxShadow: `0 0 24px ${group.color_hex}`,
                    color: group.color_hex,
                  }}
                >
                  <Icon size={isFirst ? 52 : 34} />
                </div>

                <div
                  className="absolute rounded-full px-2 py-1 text-xs font-black text-black"
                  style={{
                    backgroundColor: group.color_hex,
                    bottom: isFirst ? "76px" : "48px",
                    right: isFirst ? "-4px" : "-8px",
                  }}
                >
                  {index + 1}
                  {index === 0 ? "st" : index === 1 ? "nd" : "rd"}
                </div>

                <div
                  className={`mt-3 w-24 rounded-t-2xl border bg-white/5 px-2 py-5 text-center ${
                    isFirst ? "h-36" : "h-28"
                  }`}
                  style={{
                    borderColor: `${group.color_hex}60`,
                    boxShadow: isFirst ? `0 0 22px ${group.color_hex}50` : "",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase"
                    style={{ color: group.color_hex }}
                  >
                    {group.name}
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    {group.clan_name}
                  </p>

                  <p className="mt-2 text-lg font-bold">
                    {formatPoints(group.points)}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        <p className="mt-10 text-xs uppercase tracking-widest text-white/30">
          Florians Group Leaderboard
        </p>

        <section className="mt-4 space-y-3">
          {rankedGroups.map((group, index) => {
            const Icon = iconMap[group.icon as keyof typeof iconMap] ?? Trophy;

            return (
              <div
                key={group.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <p
                    className="w-5 text-sm font-bold"
                    style={{ color: index < 3 ? group.color_hex : "#888888" }}
                  >
                    {index + 1}
                  </p>

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{
                      color: group.color_hex,
                      borderColor: `${group.color_hex}80`,
                      boxShadow: `0 0 12px ${group.color_hex}50`,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold uppercase">
                      {group.name}
                    </h2>
                    <p className="text-xs uppercase tracking-wide text-white/35">
                      {group.clan_name}
                    </p>
                  </div>
                </div>

                <p className="text-right text-sm font-semibold">
                  {formatPoints(group.points)}
                </p>
              </div>
            );
          })}
        </section>

        <a
          href="/login"
          className="mx-auto mt-8 block w-64 rounded-full bg-green-400 py-4 text-center text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-green-400/40"
        >
          Update Points
        </a>

        <p className="mt-4 text-center text-xs uppercase tracking-widest text-white/20">
          Colorless Access Only
        </p>
      </section>
    </main>
  );
}