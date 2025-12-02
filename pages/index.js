export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-4xl border border-hunterRed/40 rounded-3xl bg-gradient-to-br from-black via-hunterDark to-black p-8 md:p-12 shadow-2xl">
        {/* Logo + badge */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-hunterRed flex items-center justify-center text-sm font-bold">
              CH
            </div>
            <div className="text-sm leading-tight">
              <div className="font-semibold">CarHunter</div>
              <div className="text-xs text-gray-400">
                SaaS de prospection auto par SMS
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs border border-hunterRed/60 text-hunterRed">
            NOUVEAU · AUTOMATISATION IA
          </span>
        </header>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Bloc gauche : texte principal */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Tu ne cherches plus les voitures,
              <br />
              <span className="text-hunterRed">tu les chasses.</span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-gray-300">
              CarHunter repère pour toi les meilleures annonces de voitures et
              contacte automatiquement les vendeurs par SMS. Tu reçois
              seulement les bons plans dans ton tableau de bord.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-hunterRed hover:bg-red-700 transition rounded-full py-3 text-sm md:text-base font-semibold">
                Demander un accès anticipé
              </button>
              <button className="flex-1 border border-gray-700 hover:border-gray-500 transition rounded-full py-3 text-sm md:text-base">
                Voir comment ça marche →
              </button>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-gray-300">
              <li>• Scan auto des annonces (24h/24)</li>
              <li>• SMS pré-écrits qui donnent envie de répondre</li>
              <li>• Parfait pour achat-revente, garages, mandataires</li>
            </ul>
          </div>

          {/* Bloc droit : simulation */}
          <div className="bg-hunterPanel/80 border border-hunterRed/40 rounded-2xl p-5 text-sm">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Simulation CarHunter
            </h2>
            <p className="text-2xl font-bold">
              32 vendeurs contactés <br />
              <span className="text-sm font-normal text-gray-400">
                aujourd&apos;hui
              </span>
            </p>

            <p className="mt-3 text-xs text-gray-300">
              Exemple : recherche de Peugeot 208 &lt; 7 000 € autour de Bordeaux
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-gray-400">Taux de réponse</div>
                <div className="text-lg font-semibold">54%</div>
              </div>
              <div>
                <div className="text-gray-400">Deals trouvés</div>
                <div className="text-lg font-semibold">5</div>
              </div>
              <div>
                <div className="text-gray-400">Gain moyen / deal</div>
                <div className="text-lg font-semibold">&gt; 650 €</div>
              </div>
              <div>
                <div className="text-gray-400">Temps gagné</div>
                <div className="text-lg font-semibold">&gt; 4 h / jour</div>
              </div>
            </div>

            <p className="mt-5 text-xs text-gray-400">
              Interface en cours de développement. Cette page est une preview de
              la version bêta de CarHunter.
            </p>
          </div>
        </div>

        {/* Bas de page */}
        <p className="mt-8 text-[11px] text-gray-500 text-center">
          Intéressé par tester CarHunter en avant-première ? Ajoute simplement
          ton email dans ta bio ou envoie un message à ton futur site quand il
          sera live — tu pourras brancher ici un vrai formulaire plus tard.
        </p>
      </div>
    </div>
  );
}
