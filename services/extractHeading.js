const axios = require("axios");
const cheerio = require("cheerio");

async function extractHeadingsFromURL(url) {
  try {
    const { data } = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(data);
    const tags = ["h1", "h2", "h3", "h4", "h5", "h6"];

    return tags.flatMap((tag) =>
      $(tag)
        .map((_, el) => ({ tag: tag.toUpperCase(), text: $(el).text().trim() }))
        .get()
    );
  } catch (err) {
    return [{ tag: "ERROR", text: "Không thể lấy nội dung" }];
  }
}

module.exports = { extractHeadingsFromURL };
