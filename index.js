const express = require('express');
const multer = require('multer');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('./model/mobilenet');
const { findBestMatch } = require('./utils/matcher');

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

let model;
(async () => {
  model = await mobilenet.loadModel();
})();

app.post('/search', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No image uploaded');

  const imageBuffer = fs.readFileSync(req.file.path);
  const tensor = tf.node.decodeImage(imageBuffer);
  const vector = await mobilenet.extractFeatures(model, tensor);

  const db = JSON.parse(fs.readFileSync('./data/database.json'));
  const result = findBestMatch(vector, db);

  res.json({ matches: result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
