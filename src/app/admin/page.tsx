import { Resend } from "resend";
import { redirect } from "next/navigation";
import { AdminDashboard } from "./AdminDashboard";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const resolvedParams = await searchParams;

  if (resolvedParams.token !== process.env.ADMIN_TOKEN) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-conteo-dark text-white">
        <h1 className="text-2xl font-bold">Accès refusé</h1>
      </div>
    );
  }

  const { data, error } = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID || undefined,
    limit: 100
  } as any);
  
  if (error) {
    return <div className="p-8 text-red-500">Erreur de chargement des contacts</div>;
  }

  const contacts = data?.data || [];

  return (
    <main className="min-h-screen bg-conteo-dark p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 font-heading text-3xl font-bold text-conteo-accent">
          Dashboard Beta Contéo
        </h1>
        <AdminDashboard initialContacts={contacts as any} token={resolvedParams.token || ""} />
      </div>
    </main>
  );
}
