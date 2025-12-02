import { useState } from "react";
import "@/styles/globals.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full border border-red-700/40 rounded-3xl bg-gradient-to-br from-black to-[#111111] p-8 md:p-12 shadow-[0_0_80px_rgba(255,0,0,0.2)]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm">
            CH
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold">CarHunter</span>
            <span className="text-xs text-gray-400">
              SaaS de prospection auto par SMS
            </span>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-600/10 border border-red-600/40 text-xs font-medium text-red-400 mb-4">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          NOUVEAU · AUTOMATISATION IA
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Colonne gauche */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Tu ne cherches plus les voitures,
              <br />
              <span className="text-red-500">tu les chasses.</span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-gray-300">
              CarHunter repère pour toi les meilleures annonces de voitures et
              contacte automatiquement les vendeurs par SMS. Tu reçois seulement
              les bons plans dans ton tableau de bord.
            </p>

            {/* FORMULAIRE */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="Ton email pour accéder à la bêta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-black/40 border border-gray-700 text-sm focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Envoi..." : "Demander un accès anticipé"}
              </button>
            </form>

            {status === "success" && (
              <p className="mt-3 text-sm text-green-400">
                ✅ Merci ! Ton email est bien enregistré. Tu seras prévenu dès
                l’ouverture de la bêta.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-red-400">
                ❌ Oups, une erreur est survenue. Réessaie dans quelques
                instants.
              </p>
            )}

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 text-xs md:text-sm text-gray-200 hover:bg-white/5 transition"
            >
              Voir comment ça marche ✨
            </button>

            <ul className="mt-4 space-y-1 text-xs md:text-sm text-gray-300">
              <li>• Scan auto des annonces (24h/24)</li>
              <li>• SMS pré-écrits qui donnent envie de répondre</li>
              <li>• Parfait pour achat-revente, garages, mandataires</li>
            </ul>
          </div>

          {/* Colonne droite : carte de stats */}
          <div className="bg-black/40 border border-gray-800 rounded-2xl p-5 md:p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-200 mb-3">
                SIMULATION CARHUNTER
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                32 vendeurs contactés aujourd&apos;hui
                <br />
                <span className="text-[11px] text-gray-500">
                  Exemple : recherche de Peugeot 208 &lt; 7 000 € autour de
                  Bordeaux.
                </span>
              </p>

              <div className="space-y-3 text-xs text-gray-200">
                <div className="flex justify-between">
                  <span>Taux de réponse</span>
                  <span className="font-semibold text-green-400">54%</span>
                </div>
                <div className="flex justify-between">
                  <span>Deals trouvés</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Gain moyen / deal</span>
                  <span className="font-semibold text-red-400">&gt; 650 €</span>
                </div>
                <div className="flex justify-between">
                  <span>Temps gagné</span>
                  <span className="font-semibold">&gt; 4 h / jour</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-gray-500">
              Interface en cours de développement. Cette page est une preview de
              la version bêta de CarHunter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
