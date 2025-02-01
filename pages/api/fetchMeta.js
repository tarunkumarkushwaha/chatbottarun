import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests are allowed" });
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new", 
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract meta description
    const metaDescription = await page.evaluate(() => {
      const metaTag = document.querySelector('meta[name="description"]');
      return metaTag ? metaTag.content : "No meta description found";
    });

    await browser.close();

    res.status(200).json({ description: metaDescription });
  } catch (error) {
    console.error("Error fetching meta description:", error);
    res.status(500).json({ error: "Failed to fetch meta description" });
  }
}
