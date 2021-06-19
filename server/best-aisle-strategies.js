const bestAisleByCount = (aisles = []) => {
  const counts = aisles.reduce((counts, aisle) => {
    counts[aisle] = counts[aisle] || 0;
    counts[aisle] += 1;
    return counts;
  }, {});
  const [bestAisle] = Object.entries(counts).reduce(
    ([bestAisle, bestCount], [aisle, count]) =>
      count > bestCount ? [aisle, count] : [bestAisle, bestCount],
    ['Not Found', 0]
  );
  return bestAisle.split(' ')[1];
};

const bestAisleByFirst = (aisles = []) => {
  if (!aisles.length) return 'Not Found';
  return aisles[0].split(' ')[1];
};

module.exports = { bestAisleByCount, bestAisleByFirst };
