import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PointsForm from "./PointsForm";

export default async function PointsPage() {
  const cookieStore = await cookies();
  const access = cookieStore.get("colorless_access")?.value;

  if (access !== "granted") {
    redirect("/login");
  }

  const { data: groups, error } = await supabase
    .from("groups")
    .select("*")
    .order("name", { ascending: true });

  if (error || !groups) {
    return (
      <main className="min-h-screen bg-black p-6 text-white">
        Failed to load groups.
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 py-6 text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-56 -right-24 h-80 w-80 rounded-full bg-green-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto max-w-md">
        <p className="text-xs font-black uppercase tracking-widest text-cyan-400">
          Colorless Portal
        </p>

        <h1 className="mt-2 text-4xl font-black tracking-tight">
          Group Points
        </h1>

        <div className="mt-8">
          <PointsForm groups={groups} />
        </div>
      </section>
    </main>
  );
}