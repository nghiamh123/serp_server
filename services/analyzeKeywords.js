function getMostCommonWords(results) {
  const wordCount = {};

  results.forEach(({ headings }) => {
    headings.forEach(({ text }) => {
      const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(
          (w) => w.length > 2 && !["the", "and", "with", "for"].includes(w)
        );

      words.forEach((word) => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
    });
  });

  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
}

module.exports = { getMostCommonWords };
