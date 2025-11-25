export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="max-w-2xl w-full bg-[#141414] border border-red-700 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          CarHunter – Dashboard (pré-version)
        </h1>
        <p className="mb-4 text-lg">
          Ici, tu verras bientôt :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-200">
          <li>✅ Tes recherches de véhicules en cours</li>
          <li>✅ Les vendeurs contactés automatiquement</li>
          <li>✅ Les réponses reçues par SMS</li>
        </ul>
        <p className="mt-6 text-sm text-gray-400">
          Cette page est une version de prévisualisation. Les fonctionnalités seront
          activées au fur et à mesure du développement. Pour l’instant, elle montre
          simplement que le routing Next.js fonctionne.
        </p>
      </div>
    </div>
  );
}
