// pages/api/search-cars.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { brand, model, maxPrice, region } = req.body;

  // Ici, plus tard, tu mettras le VRAI scraping Leboncoin / LaCentrale
  // (axios + cheerio ou un script séparé pour respecter leurs règles).
  // Pour l'instant on renvoie des données factices pour tester le SaaS.

  const fakeResults = [
    {
      id: 1,
      title: "Peugeot 208 1.2 PureTech",
      price: 6500,
      km: 98000,
      year: 2016,
      source: "Leboncoin",
      url: "https://www.leboncoin.fr/voitures/peugeot-208-exemple"
    },
    {
      id: 2,
      title: "Renault Clio 4 TCe 90",
      price: 5900,
      km: 110000,
      year: 2015,
      source: "LaCentrale",
      url: "https://www.lacentrale.fr/auto/renault-clio-exemple"
    },
    {
      id: 3,
      title: "Toyota Yaris 1.0 VVT-i",
      price: 5200,
      km: 120000,
      year: 2014,
      source: "Leboncoin",
      url: "https://www.leboncoin.fr/voitures/toyota-yaris-exemple"
    }
  ];

  // On répond avec les faux résultats
  return res.status(200).json({
    criteria: { brand, model, maxPrice, region },
    results: fakeResults,
  });
}
