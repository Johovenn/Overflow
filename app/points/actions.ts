"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updateGroupPoints(formData: FormData) {
  const cookieStore = await cookies();
  const access = cookieStore.get("colorless_access")?.value;

  if (access !== "granted") {
    redirect("/login");
  }

  const groupId = String(formData.get("groupId"));
  const points = Number(formData.get("points"));

  if (!groupId || Number.isNaN(points)) {
    throw new Error("Invalid form data.");
  }

  const { data: group, error: fetchError } = await supabaseAdmin
    .from("groups")
    .select("points")
    .eq("id", groupId)
    .single();

  if (fetchError || !group) {
    throw new Error("Group not found.");
  }

  const newPoints = Math.max(0, group.points + points);

  const { error: updateError } = await supabaseAdmin
    .from("groups")
    .update({ points: newPoints })
    .eq("id", groupId);

  if (updateError) {
    throw new Error("Failed to update points.");
  }

  revalidatePath("/");
  revalidatePath("/points");

  redirect("/");
}