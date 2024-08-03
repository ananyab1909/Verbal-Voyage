const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/translation-db';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const interactionSchema = new mongoose.Schema({
  text: String,
  langCode: String,
  translatedText: String,
  timestamp: { type: Date, default: Date.now }
});

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;