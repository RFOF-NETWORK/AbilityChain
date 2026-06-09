// Wallet-Controller – PZQQET-0 Native Mask/Seed

import { db } from "../wallet/persistence.js";

const core = PZQQETFUSIONMASTER.Axioms;
const anchors = core.core_anchors;
const pool = core.wordPool;

function pickWords(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool[idx]);
  }
  return out;
}

async function sha256Hex(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// PZQQET-Seed = (User+PW1+PW2) + (12/24 Wörter) + (36 Genesis) → SHA-256 Maske
export async function generatePZQQETSeed(username, pw1, pw2, wordCount) {
  if (!username || !pw1 || pw1 !== pw2) return null;

  const userPart = ${username}:${pw1}:${pw2};
  const words = pickWords(wordCount);
  const genesis = anchors.join("|");

  const raw = ${userPart}::${words.join(" ")}::${genesis};
  const mask = await sha256Hex(raw);

  return {
    words,
    mask,
    display: ${words.join(" ")}\n\n[GENESIS-MASK: ${mask}]
  };
}

export async function login(username, pw) {
  const stored = db.load(user:${username});
  if (!stored) return false;

  const raw = ${username}:${pw}:${pw}::${anchors.join("|")};
  const mask = await sha256Hex(raw);

  return mask.slice(0, 32) === stored.mask.slice(0, 32);
}

export function saveUser(username, mask) {
  db.save(user:${username}, { mask });
}
