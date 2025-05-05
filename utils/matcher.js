function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (normA * normB);
}

function findBestMatch(vector, database) {
  let bestMatch = null;
  let highestSimilarity = -1;

  for (const entry of database) {
    const similarity = cosineSimilarity(vector, entry.vector);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = entry;
    }
  }

  return bestMatch;
}

module.exports = { findBestMatch };
