const axios = require("axios");
const API_KEY =
  "00dbb2768cb09faf49314fc24fd384cf158519cfb3c9c1fc3496d11555f3e0f3";

async function searchGoogle(keyword) {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(
    keyword
  )}&api_key=${API_KEY}`;
  const res = await axios.get(url);
  return (
    res.data.organic_results?.slice(0, 10).map((r) => ({
      title: r.title,
      link: r.link,
    })) || []
  );
}

module.exports = { searchGoogle };
