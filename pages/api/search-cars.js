import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Requête manquante" });
    }

    const SCRAPER_API = process.env.SCRAPER_API;

    const searchUrl = `https://www.leboncoin.fr/recherche?category=2&text=${encodeURIComponent(
      query
    )}`;

    const url = `http://api.scraperapi.com?api_key=${SCRAPER_API}&url=${encodeURIComponent(
      searchUrl
    )}`;

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const results = [];

    $("a[data-qa-id='aditem_container']").each((i, elem) => {
      const title = $(elem).find("p[data-qa-id='aditem_title']").text().trim();
      const price = $(elem)
        .find("span[data-qa-id='aditem_price']")
        .text()
        .trim();
      const location = $(elem)
        .find("p[data-qa-id='aditem_location']")
        .text()
        .trim();

      const link =
        "https://www.leboncoin.fr" + $(elem).attr("href");

      results.push({ title, price, location, link });
    });

    res.status(200).json({ results });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: "Erreur scraping" });
  }
}
