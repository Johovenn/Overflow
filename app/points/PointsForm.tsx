"use client";

import { useState } from "react";
import { Gem, Leaf, Send, Sparkles, Sun } from "lucide-react";
import { updateGroupPoints } from "./actions";

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

export default function PointsForm({ groups }: { groups: Group[] }) {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id ?? "");
  const [points, setPoints] = useState(100);

  return (
    <form action={updateGroupPoints} className="space-y-8">
      <input type="hidden" name="groupId" value={selectedGroupId} />
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
          Select Group
        </p>

        <div className="max-h-80 space-y-4 overflow-y-auto p-4">
          {["Sapphire", "Emerald", "Citrine", "Amethyst"].map((clanName) => {
            const clanGroups = groups.filter(
              (group) => group.clan_name === clanName
            );

            return (
              <div key={clanName}>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/40">
                  {clanName}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {clanGroups.map((group) => {
                    const Icon =
                      iconMap[group.icon as keyof typeof iconMap] ?? Gem;
                    const isSelected = selectedGroupId === group.id;

                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setSelectedGroupId(group.id)}
                        className={`rounded-xl border bg-zinc-900 p-4 transition ${
                          isSelected
                            ? "border-white/40 shadow-lg"
                            : "border-white/10 opacity-70"
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? `0 0 18px ${group.color_hex}`
                            : "",
                        }}
                      >
                        <Icon
                          size={22}
                          className="mx-auto"
                          style={{ color: group.color_hex }}
                        />

                        <p className="mt-2 text-xs font-semibold">
                          {group.name}
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          {group.points} pts
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-white/50">
          Points to Award
        </p>

        <p
          className={`mt-4 text-6xl font-black ${
            points < 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {points}
        </p>

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