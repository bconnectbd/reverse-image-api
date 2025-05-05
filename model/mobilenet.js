const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
  return await tf.loadGraphModel('https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/feature_vector/4', { fromTFHub: true });
}

async function extractFeatures(model, tensor) {
  const resized = tf.image.resizeBilinear(tensor, [224, 224]);
  const normalized = resized.div(255.0).expandDims(0);
  const features = model.predict(normalized);
  return features.squeeze().arraySync();
}

module.exports = { loadModel, extractFeatures };
