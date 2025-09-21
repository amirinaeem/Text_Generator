// ==================================
// Fetch text from URL(s) and normalize to clean plain text.
// Also accepts raw strings (pass-through) and file buffers.
// ==================================


import fetch from 'node-fetch';
import { stripHtml } from './stripHtml.js';


export async function textFromUrl(url) {
const res = await fetch(url, { redirect: 'follow' });
if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`);
const body = await res.text();
const contentType = res.headers.get('content-type') || '';
if (contentType.includes('html')) return stripHtml(body);
return body;
}