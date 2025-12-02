import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "ok" | "error" | null
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("ok");
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-zinc-950 border border-red-600/40 rounded-3xl p-8 md:p-10 shadow-[0_0_80px_rgba(220,38,38,0.45)]">
        {/* Logo + titre */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold">
            CH
          </div>
          <div>
            <div className="text-sm font-semibold">CarHunter</div>
            <div className="text-xs text-zinc-400">
              SaaS de prospection auto par SMS
            </div>
          </div>
        </div>

        <div className="inline-flex text-[10px] px-3 py-1 rounded-full bg-red-600/10 text-red-400 border border-red-600/40 mb-4">
          NOUVEAU · AUTOMATISATION IA
        </div>

        {/* Bloc principal */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Texte + formulaire */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Tu ne cherches plus les voitures,
              <br />
              <span className="text-red-500">tu les chasses.</span>
            </h1>
            <p className="mt-4 text-sm md:text-base text-zinc-300">
              CarHunter repère pour toi les meilleures annonces de voitures et
              contacte automatiquement les vendeurs par SMS. Tu reçois seulement
              les bons plans dans ton tableau de bord.
            </p>

            {/* Formulaire email */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="Ton email pour l'accès anticipé"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-sm font-semibold transition disabled:opacity-60"
              >
                {loading ? "Enregistrement..." : "Demander un accès anticipé"}
              </button>
            </form>

            {/* Message de retour */}
            {status === "ok" && (
              <p className="mt-3 text-xs text-emerald-400">
                C’est bon, tu es sur la liste d’attente CarHunter 🙌
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-xs text-red-400">
                Oups, une erreur est survenue. Réessaie dans un instant.
              </p>
            )}

            <ul className="mt-6 text-xs md:text-sm text-zinc-300 space-y-1">
              <li>• Scan auto des annonces (24h/24)</li>
              <li>• SMS pré-écrits qui donnent envie de répondre</li>
              <li>• Parfait pour achat-revente, garages, mandataires</li>
            </ul>
          </div>

          {/* Carte "simulation" à droite */}
          <div className="bg-zinc-900/80 border border-zinc-700 rounded-2xl p-5 text-sm">
            <h2 className="text-xs text-zinc-400 uppercase tracking-wide mb-2">
              SIMULATION CARHUNTER
            </h2>
            <p className="text-sm text-zinc-200 mb-4">
              <span className="text-3xl font-bold text-red-500">32</span>{" "}
              vendeurs contactés aujourd&apos;hui
            </p>
            <p className="text-xs text-zinc-300 mb-3">
              Exemple : recherche de Peugeot 208 &lt; 7 000 € autour de Bordeaux.
            </p>
            <div className="space-y-2 text-xs text-zinc-300">
              <p>
                <span className="text-zinc-400">Taux de réponse :</span> 54%
              </p>
              <p>
                <span className="text-zinc-400">Deals trouvés :</span> 4 / jour
              </p>
              <p>
                <span className="text-zinc-400">Gain moyen / deal :</span> +650 €
              </p>
              <p>
                <span className="text-zinc-400">Temps gagné :</span> 3–4 h / jour
              </p>
            </div>
            <p className="mt-4 text-[11px] text-zinc-500">
              Interface en cours de développement. Cette page est une préview de
              la version bêta de CarHunter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
