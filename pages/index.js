// pages/index.js
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [volume, setVolume] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, useCase, volume }),
      });

      if (res.ok) {
        setStatus("ok");
        setEmail("");
        setUseCase("");
        setVolume("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("early-access-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl border border-red-700 rounded-3xl p-8 bg-gradient-to-b from-black to-[#140000] shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold">
            CH
          </div>
          <div>
            <p className="font-semibold text-sm">CarHunter</p>
            <p className="text-xs text-gray-400">
              SaaS de prospection auto par SMS
            </p>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-xs px-2 py-1 rounded-full border border-red-600 text-red-400">
            NOUVEAU · AUTOMATISATION IA
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Tu ne cherches plus les voitures,
          <br />
          <span className="text-red-500">tu les chasses.</span>
        </h1>

        <p className="text-gray-300 mb-6 max-w-xl text-sm md:text-base">
          CarHunter repère pour toi les meilleures annonces de voitures et
          contacte automatiquement les vendeurs par SMS. Tu reçois seulement
          les bons plans dans ton tableau de bord.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button
            onClick={scrollToForm}
            className="flex-1 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full font-semibold text-sm md:text-base"
          >
            Demander un accès anticipé
          </button>

          <button
            onClick={() => {
              const el = document.getElementById("how-it-works");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1 border border-gray-600 hover:border-white transition px-6 py-3 rounded-full text-sm md:text-base"
          >
            Voir comment ça marche →
          </button>
        </div>

        <ul className="text-sm text-gray-300 space-y-1 mb-8">
          <li>• Scan auto des annonces (24h/24)</li>
          <li>• SMS pré-écrits qui donnent envie de répondre</li>
          <li>• Parfait pour achat-revente, garages, mandataires</li>
        </ul>

        <div className="mt-6 text-xs text-gray-500">
          Intéressé par tester CarHunter en avant-première ? Ajoute simplement
          ton email dans le bloc en bas de la page — tu seras prévenu quand la
          version bêta sera prête.
        </div>
      </div>

      {/* SECTION COMMENT ÇA MARCHE */}
      <section
        id="how-it-works"
        className="w-full max-w-3xl mt-12 bg-[#080808] border border-gray-800 rounded-3xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Comment ça marche ?</h2>
        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2">
          <li>Tu définis le type de voiture que tu cherches.</li>
          <li>CarHunter scanne les annonces et repère les bonnes opportunités.</li>
          <li>Des SMS sont envoyés automatiquement aux vendeurs.</li>
          <li>
            Tu reçois les réponses et les meilleurs deals directement dans ton
            espace.
          </li>
        </ol>
      </section>

      {/* FORMULAIRE D’ACCÈS ANTICIPÉ */}
      <section
        id="early-access-form"
        className="w-full max-w-3xl mt-12 bg-[#080808] border border-red-800 rounded-3xl p-6 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">
          Demander un accès anticipé
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          Laisse ton email et comment tu veux utiliser CarHunter. Tu seras
          prioritaire quand la bêta sera ouverte.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-3 py-2 bg-black border border-gray-700 focus:border-red-500 outline-none text-sm"
              placeholder="tonemail@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Comment tu veux utiliser CarHunter ?
            </label>
            <input
              type="text"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full rounded-lg px-3 py-2 bg-black border border-gray-700 focus:border-red-500 outline-none text-sm"
              placeholder="Achat-revente, garage, mandataire..."
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Volume (ex : voitures / mois)
            </label>
            <input
              type="text"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full rounded-lg px-3 py-2 bg-black border border-gray-700 focus:border-red-500 outline-none text-sm"
              placeholder="Ex : 5 voitures / mois"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 transition px-6 py-2 rounded-full font-semibold text-sm"
          >
            {status === "loading" ? "Envoi..." : "Je veux être sur la liste"}
          </button>

          {status === "ok" && (
            <p className="text-green-400 text-sm mt-2">
              Merci ! Tu es bien enregistré, tu seras prévenu dès que la bêta
              sera prête.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm mt-2">
              Oups, une erreur est survenue. Réessaie dans quelques secondes.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
