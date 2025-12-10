import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const { query } = req.body;

  if (!query)
    return res.status(400).json({ error: "Requête manquante" });

  const SCRAPER_API = process.env.SCRAPER_API;

  try {
    const url = `http://api.scraperapi.com?api_key=${SCRAPER_API}&url=https://www.leboncoin.fr/recherche?category=2&text=${encodeURIComponent(query)}`;

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const results = [];

    $(".styles_adCard__3cYJ9").each((i, el) => {
      results.push({
        title: $(el).find("p[data-qa-id='aditem_title']").text(),
        price: $(el).find("span[data-qa-id='aditem_price']").text(),
        location: $(el).find("p[data-qa-id='aditem_location']").text(),
        link: "https://www.leboncoin.fr" + $(el).find("a").attr("href"),
      });
    });

    res.status(200).json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur scraping" });
  }
}
