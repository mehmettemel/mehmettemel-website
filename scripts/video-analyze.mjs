#!/usr/bin/env node

/**
 * Video Analyze Script
 * Usage: node scripts/video-analyze.mjs <video-url>
 *
 * Downloads video with yt-dlp, uploads to Gemini, returns analysis.
 * Requires: GEMINI_API_KEY in .env.local, yt-dlp installed
 */

import { GoogleGenAI } from '@google/genai';
import { execFile } from 'node:child_process';
import { readFile, unlink } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { config } from 'dotenv';

config({ path: '.env.local' });

const url = process.argv[2];
if (!url) {
  console.error('Kullanim: node scripts/video-analyze.mjs <video-url>');
  process.exit(1);
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY .env.local dosyasinda bulunamadi');
  process.exit(1);
}

const id = randomUUID().slice(0, 8);
const tmpPath = `/tmp/analiz-${id}.mp4`;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function downloadVideo() {
  console.error('[1/3] Video indiriliyor...');
  return new Promise((resolve, reject) => {
    execFile(
      'yt-dlp',
      ['-f', 'mp4/best', '--recode-video', 'mp4', '-o', tmpPath, url],
      { timeout: 300_000 },
      (err, stdout, stderr) => {
        if (err) reject(new Error(`yt-dlp hatasi: ${err.message}\n${stderr}`));
        else resolve();
      }
    );
  });
}

async function uploadToGemini() {
  console.error('[2/3] Gemini\'ye yukleniyor...');
  const videoBuffer = await readFile(tmpPath);
  const blob = new Blob([videoBuffer], { type: 'video/mp4' });

  const uploadResult = await ai.files.upload({
    file: blob,
    config: { mimeType: 'video/mp4' },
  });

  let file = uploadResult;
  while (file.state === 'PROCESSING') {
    console.error('  Isleniyor, bekleniyor...');
    await new Promise((r) => setTimeout(r, 4000));
    file = await ai.files.get({ name: file.name });
  }

  if (file.state === 'FAILED') {
    throw new Error('Gemini dosya isleme basarisiz oldu');
  }

  return file;
}

async function analyzeVideo(file) {
  console.error('[3/3] Analiz ediliyor...');
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          {
            fileData: {
              fileUri: file.uri,
              mimeType: 'video/mp4',
            },
          },
          {
            text: `Bu videoyu bastan sona izle ve sesi de dinle. Yapilan her isi adim adim zaman damgali ([00:15] gibi) olarak Turkce ve Markdown formatinda anlat.

Kurallar:
- Her adimi net ve ozetleyerek yaz
- Zaman damgalarini dogru ver
- Kullanilan arac, malzeme veya yazilimlari ayri bir "## Kullanilan Araclar / Malzemeler" basliginda listele
- Videodaki konusmalardan onemli noktalari belirt
- Genel bir ozet ile bitir`,
          },
        ],
      },
    ],
  });

  return response.candidates[0].content.parts[0].text;
}

async function cleanup() {
  try {
    await unlink(tmpPath);
  } catch {}
}

try {
  await downloadVideo();
  const file = await uploadToGemini();
  const result = await analyzeVideo(file);
  await cleanup();
  // Result goes to stdout, progress logs go to stderr
  console.log(result);
} catch (err) {
  await cleanup();
  console.error(`\nHata: ${err.message}`);
  process.exit(1);
}
