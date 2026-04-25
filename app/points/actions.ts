"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updateClanPoints(formData: FormData) {
  const cookieStore = await cookies();
  const access = cookieStore.get("colorless_access")?.value;

  if (access !== "granted") {
    redirect("/login");
  }

  const clanId = String(formData.get("clanId"));
  const points = Number(formData.get("points"));

  if (!clanId || Number.isNaN(points)) {
    throw new Error("Invalid form data.");
  }

  const { data: clan, error: fetchError } = await supabaseAdmin
    .from("clans")
    .select("points")
    .eq("id", clanId)
    .single();

  if (fetchError || !clan) {
    throw new Error("Clan not found.");
  }

  const newPoints = clan.points + points

  const { error: updateError } = await supabaseAdmin
    .from("clans")
    .update({ points: newPoints })
    .eq("id", clanId);

  if (updateError) {
    throw new Error("Failed to update points.");
  }

  revalidatePath("/");
  revalidatePath("/points");

  redirect("/");
}