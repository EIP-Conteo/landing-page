"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Check, Search, CloudDownload } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchContactByEmail } from "./actions";

type Contact = {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  audience_id?: string | null;
  created_at: string;
};

export function AdminDashboard({
  initialContacts,
  token,
}: {
  initialContacts: Contact[];
  token: string;
}) {
  const [contacts, setContacts] = useState(initialContacts);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchingServer, setIsSearchingServer] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredContacts = contacts.filter((contact) =>
    contact.email.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  const handleServerSearch = async () => {
    if (!debouncedQuery || !debouncedQuery.includes("@")) return;
    setIsSearchingServer(true);
    try {
      const serverContact = await searchContactByEmail(
        debouncedQuery.trim(),
        token,
      );
      if (serverContact) {
        // Ajouter le contact à la liste s'il n'y est pas déjà
        setContacts((prev) => {
          if (prev.some((c) => c.id === serverContact.id)) return prev;
          return [serverContact, ...prev];
        });
      } else {
        alert("Aucun contact trouvé sur le serveur pour cet email.");
      }
    } catch (e) {
      alert("Erreur lors de la recherche serveur.");
    } finally {
      setIsSearchingServer(false);
    }
  };

  const sendAccess = async (contact: Contact) => {
    let osToUse = contact.first_name;

    if (!osToUse) {
      const userInput = window.prompt("Cet utilisateur n'a pas précisé son appareil (OS manquant).\\nTapez 'iOS' ou 'Android' pour choisir quel email envoyer :");
      if (!userInput) return;
      
      const normalized = userInput.trim().toLowerCase();
      if (normalized === "ios") osToUse = "iOS";
      else if (normalized === "android") osToUse = "Android";
      else {
        alert("Saisie invalide. Veuillez taper exactement iOS ou Android.");
        return;
      }
    }

    setLoadingId(contact.id);
    try {
      const res = await fetch("/api/admin/send-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: contact.email,
          os: osToUse,
          contactId: contact.id,
          audienceId: contact.audience_id,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("RAW API RESPONSE:", text);
        let errorData = { error: "" };
        try {
          errorData = JSON.parse(text);
        } catch (e) {}
        throw new Error(errorData.error || ("Failed to send (HTTP " + res.status + "): " + text.substring(0, 50)));
      }

      const data = await res.json();

      setContacts((prev) =>
        prev.map((c) =>
          c.id === contact.id ? { ...c, last_name: data.status, first_name: osToUse } : c,
        ),
      );
    } catch (error: any) {
      alert("Erreur lors de l'envoi de l'email : " + error.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-white/50" />
        <Input
          type="search"
          placeholder="Rechercher par email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-conteo-accent/30 focus-visible:border-conteo-accent"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-4 px-4 font-semibold text-conteo-text-muted">
                Email
              </th>
              <th className="pb-4 px-4 font-semibold text-conteo-text-muted">
                OS
              </th>
              <th className="pb-4 px-4 font-semibold text-conteo-text-muted">
                Date Inscription
              </th>
              <th className="pb-4 px-4 font-semibold text-conteo-text-muted">
                Statut
              </th>
              <th className="pb-4 px-4 font-semibold text-conteo-text-muted">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => {
              const isSent = contact.last_name?.startsWith("Envoyé");
              return (
                <tr
                  key={contact.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">{contact.email}</td>
                  <td className="py-4 px-4">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
                      {contact.first_name || "Inconnu"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-conteo-text-muted">
                    {new Date(contact.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-4 px-4">
                    {isSent ? (
                      <span className="inline-flex items-center gap-1.5 text-conteo-accent">
                        <Check className="size-4" />
                        {contact.last_name}
                      </span>
                    ) : (
                      <span className="text-yellow-400">En attente</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Button
                      onClick={() => sendAccess(contact)}
                      disabled={loadingId === contact.id || isSent}
                      className={cn(
                        "h-10 rounded-xl px-4 font-semibold",
                        isSent
                          ? "bg-white/10 text-white/50"
                          : "bg-conteo-accent text-conteo-dark hover:bg-conteo-accent/90",
                      )}
                    >
                      {loadingId === contact.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : isSent ? (
                        "Déjà envoyé"
                      ) : (
                        <>
                          <Send className="mr-2 size-4" />
                          Envoyer accès
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              );
            })}
            {filteredContacts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-conteo-text-muted"
                >
                  {contacts.length === 0 ? (
                    "Aucun inscrit pour le moment."
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <p>Aucun résultat local pour cette recherche.</p>
                      {debouncedQuery.includes("@") && (
                        <Button
                          onClick={handleServerSearch}
                          disabled={isSearchingServer}
                          variant="outline"
                          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                        >
                          {isSearchingServer ? (
                            <Loader2 className="size-4 animate-spin mr-2" />
                          ) : (
                            <CloudDownload className="size-4 mr-2" />
                          )}
                          Chercher sur le serveur Resend
                        </Button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
