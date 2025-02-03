import puppeteer from "puppeteer";

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

    const metaDescription = await page.evaluate(() => {
      const metaTag = document.querySelector('meta[name="description"]');
      return metaTag ? metaTag.content : "No meta description found";
    });


    const contentChunks = await page.evaluate(() => {
      const extractText = (selector) => {
        return Array.from(document.querySelectorAll(selector))
          .map((el) => el.innerText.trim())
          .filter((text) => text.length > 10); 
      };

      return [
        ...extractText("h1"),
        ...extractText("h2"),
        ...extractText("h3"),
        ...extractText("p"),
        ...extractText("li"),
      ];
    });

    await browser.close();

    res.status(200).json({
      url,
      status: contentChunks.length > 0 ? "Scraped" : "No meaningful content found",
      description: metaDescription,
      chunks: contentChunks.slice(0, 10), // Limit10chunks
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
}

