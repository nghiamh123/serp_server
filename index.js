const express = require("express");
const cors = require("cors");
const { searchGoogle } = require("./services/googleSearch");
const { getMostCommonWords } = require("./services/analyzeKeywords");
const { extractHeadingsFromURL } = require("./services/extractHeading");

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  const keyword = req.query.keyword;
  const results = await searchGoogle(keyword);

  const detailedResults = await Promise.all(
    results.map(async (item) => {
      const headings = await extractHeadingsFromURL(item.link);
      return {
        url: item.link,
        title: item.title,
        headings,
      };
    })
  );

  res.json(detailedResults);
});

app.get("/api/keywords", async (req, res) => {
  const keyword = req.query.keyword;
  const results = await searchGoogle(keyword);

  const detailedResults = await Promise.all(
    results.map(async (item) => {
      const headings = await extractHeadingsFromURL(item.link);
      return { headings };
    })
  );

  const keywords = getMostCommonWords(detailedResults);
  res.json(keywords);
});

app.listen(3001, () => console.log("Server chạy tại http://localhost:3001"));
