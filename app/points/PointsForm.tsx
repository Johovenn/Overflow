"use client";

import { useState } from "react";
import { Gem, Leaf, Send, Sparkles, Sun } from "lucide-react";
import { updateClanPoints } from "./actions";

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

export default function PointsForm({ clans }: { clans: Clan[] }) {
  const [selectedClanId, setSelectedClanId] = useState(clans[0]?.id ?? "");
  const [points, setPoints] = useState(100);

  return (
    <form action={updateClanPoints} className="space-y-8">
      <input type="hidden" name="clanId" value={selectedClanId} />
      <input type="hidden" name="points" value={points} />

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-white/50">
          Florian Name
        </p>

        <input
          type="text"
          placeholder="Enter name..."
          className="mt-4 w-full border-b border-white/20 bg-transparent pb-4 text-sm text-white outline-none placeholder:text-white/20"
        />
      </div>

      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">
          Select Clan
        </p>

        <div className="grid grid-cols-2 gap-3">
          {clans.map((clan) => {
            const Icon = iconMap[clan.icon as keyof typeof iconMap] ?? Gem;
            const isSelected = selectedClanId === clan.id;

            return (
              <button
                key={clan.id}
                type="button"
                onClick={() => setSelectedClanId(clan.id)}
                className={`rounded-xl border bg-zinc-900 p-4 transition ${
                  isSelected
                    ? "border-white/40 shadow-lg"
                    : "border-white/10 opacity-70"
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 18px ${clan.color_hex}` : "",
                }}
              >
                <Icon
                  size={24}
                  className="mx-auto"
                  style={{ color: clan.color_hex }}
                />

                <p className="mt-2 text-xs">{clan.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-white/50">
          Points to Award
        </p>

        <p className="mt-4 text-6xl font-black text-green-400">{points}</p>

        <div className="mx-auto mt-5 h-px w-40 bg-green-400/30" />

        <div className="mt-5 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setPoints((value) => value - 50)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl text-white/70"
          >
            −
          </button>

          <button
            type="button"
            onClick={() => setPoints((value) => value + 50)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl text-white/70"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-400 py-5 text-sm font-bold uppercase tracking-widest text-black shadow-lg shadow-green-400/40 transition hover:bg-green-300"
      >
        Submit
        <Send size={18} />
      </button>
    </form>
  );
}