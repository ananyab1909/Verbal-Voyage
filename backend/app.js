const express = require('express');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const mongoose = require('mongoose');
const Interaction = require('../database/mongodb.js');

const app = express();
const port = 3001;

app.use(express.json());

const apiEndpoint = '/translate';

let driver;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect('mongodb://localhost:27017/translation-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection established');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

mongoose.connection.on('connected', () => {
  console.log('Database connected');
});

mongoose.connection.on('error', (error) => {
  console.error('Database connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});
  
const setup = async () => {
  let options = new chrome.Options();
  options.setAcceptInsecureCerts(true);
  options.addArguments('--headless');
  options.addArguments('--disable-gpu');
  options.addArguments('--start-minimized');
  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
};

const teardown = async () => {
  if (driver) {
    await driver.quit();
  }
};

app.post(apiEndpoint, async (req, res) => {
  const { text, langCode } = req.body;
  console.log('Received request:', req.body);

  if (!text || !langCode) {
    console.log('Invalid request data');
    return res.status(400).json({ error: 'Invalid request data' });
  }

  console.log(`Received translation request: { text: ${text}, langCode: ${langCode} }`);

  if (!text || !langCode) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  console.log(`Text to translate: ${text}`);
  console.log(`Language code: ${langCode}`);

  try {
    await setup();

    const textToTranslate = text.split(' ').length > 1 ? text : encodeURIComponent(text.replace(/\s/g, '+'));

    await driver.get(`https://translate.google.com/?sl=auto&tl=${langCode}&text=${textToTranslate}`);
    console.log('Navigated to Google Translate page');

    let translationElement = await driver.wait(until.elementLocated(By.xpath('//span[@class="ryNqvb"]')), 60000);

    let translatedText = await translationElement.getAttribute('innerHTML');
    console.log(`Translated text: ${translatedText}`);

    if (mongoose.connection.readyState === 1) {
        const interaction = new Interaction({
          text,
          langCode,
          translatedText
        });
        interaction.save()
        .then(() => {
            console.log('Interaction saved to the database:', interaction);
            res.json({ text: translatedText });
        })
        
    } else {
        console.error('Error: Database connection not established');
        res.status(500).json({ error: 'An error occurred during translation' });
    }


    await teardown();

  } catch (error) {
    console.error('Error during translation:', error);
    res.status(500).json({ error: 'An error occurred during translation' });
  }
});

app.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});