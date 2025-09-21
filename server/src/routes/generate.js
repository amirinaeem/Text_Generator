// ==================================
// /api/generate endpoint: accepts pasted text, urls, and file uploads.
// Builds a MarkovMachine and returns generated text + metadata.
// ==================================

import express from 'express';
import multer from 'multer';
import { MarkovMachine } from '../markov/MarkovMachine.js';
import { textFromUrl } from '../lib/fetchSource.js';
import { errorHandler } from '../middleware/error.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/generate', upload.array('files'), async (req, res, next) => {
  try {
    console.log("=== /api/generate CALLED ===");
    console.log("Raw body:", req.body);
    console.log("Uploaded files:", req.files?.map(f => f.originalname));

    const {
      text = '',
      urls = [],
      order = 2,
      numWords = 100,
      sentenceStart = true,
      stopAtPunctuation = true,
      seed
    } = req.body || {};

    console.log("Parsed fields:", { textLength: text?.length, urls, order, numWords, sentenceStart, stopAtPunctuation, seed });

    const urlList = Array.isArray(urls) ? urls : (urls ? [urls] : []);
    const parts = [];

    if (text && typeof text === 'string') {
      console.log("Adding pasted text to corpus, length:", text.length);
      parts.push(text);
    }

    // files
    for (const file of req.files || []) {
      const fileText = file.buffer.toString('utf8');
      console.log(`Adding file ${file.originalname}, length:`, fileText.length);
      parts.push(fileText);
    }

    // urls
    for (const u of urlList) {
      if (u && typeof u === 'string') {
        console.log("Fetching text from URL:", u);
        const t = await textFromUrl(u);
        console.log("Fetched URL text length:", t.length);
        parts.push(t);
      }
    }

    if (parts.length === 0) {
      console.error("❌ No input text provided!");
      throw Object.assign(new Error('No input text provided'), { status: 400 });
    }

    const corpus = parts.join('\n\n');
    console.log("Final corpus length:", corpus.length);

    const mm = new MarkovMachine(corpus, { order: Number(order), sentenceStart, stopAtPunctuation, seed });
    const output = mm.makeText(Number(numWords));

    console.log("Generated output length:", output?.length);
    console.log("Sample output:", output?.slice(0, 120));

    res.json({
      ok: true,
      data: {
        output,
        order: Number(order),
        numWords: Number(numWords)
      }
    });

  } catch (err) {
    console.error("❌ Error in /api/generate:", err.message);
    next(err);
  }
}, errorHandler);

export default router;
