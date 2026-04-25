import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PointsPage() {
  const cookieStore = await cookies();
  const access = cookieStore.get("colorless_access")?.value;

  if (access !== "granted") {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-md">
        <h1 className="text-3xl font-black">The Colorless Control Panel</h1>
        <p className="mt-2 text-white/50">
          This page is protected. Only committee can access this.
        </p>
      </section>
    </main>
  );
}