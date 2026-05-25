# RFOF-GOLDEN-AbilityChain

---


```text
RFOF-GOLDEN-AbilityChain/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── chain/
│   ├── core/
│   │   ├── ledger.js
│   │   ├── blocks.js
│   │   ├── mempool.js
│   │   ├── consensus.js
│   │   └── validators.js
│   │
│   ├── protocol/
│   │   ├── encoding.js
│   │   ├── schema.js
│   │   └── network.js
│   │
│   ├── explorer/
│   │   ├── index.html
│   │   ├── explorer.js
│   │   └── explorer.css
│   │
│   └── viewer/
│       ├── tx-viewer.js
│       ├── block-viewer.js
│       └── styles.css
│
├── wallet/
│   ├── index.html
│   ├── styles.css
│   ├── pzqqet-0_standard.js
│   ├── xp-mining.js
│   ├── time-token.js
│   ├── persistence.js
│   │
│   ├── ui/
│   │   ├── components/
│   │   │   ├── balance-tile.js
│   │   │   ├── euro-box.js
│   │   │   ├── mining-box.js
│   │   │   ├── tx-history.js
│   │   │   └── dex-buttons.js
│   │   │
│   │   └── styles/
│   │       ├── dark.css
│   │       └── light.css
│
├── settings/
│   └── index.html
│
├── api/
│   ├── wallet-controller.js
│   ├── identity-controller.js
│   ├── finance-controller.js
│   └── explorer-controller.js
│
├── global/
│   ├── auth.js
│   └── popup.html
│
├── public/
│   ├── chain.json
│   ├── logo.svg
│   └── manifest.json
│
├── scripts/
│   ├── build.js
│   ├── serve.js
│   └── deploy.js
│
├── index.html
├── README.md
├── LICENSE.md
├── package.json
└── styles.css
```

---

⚙️ Technische Logik dieser Struktur

| Bereich | Funktion | Sichtbarkeit / UI‑Potenzial |
|----------|-----------|-----------------------------|
| chain/core | Blockchain‑Kernlogik (Ledger, Blocks, Mempool, Consensus, Validators) | Backend‑Berechnung, kann über Explorer visualisiert werden |
| chain/protocol | Netzwerk‑ und Daten‑Encoding | unsichtbar, liefert Daten für Explorer |
| chain/explorer | Frontend für Chain‑Anzeige | zeigt Blöcke, TXs, Hashes — hier erweitern wir UI |
| chain/viewer | Detailansicht einzelner Blöcke/TXs | wird als Sub‑Viewer unter Explorer eingebettet |
| wallet/ | Benutzer‑Wallet‑Frontend | Balance, Mining, History, DEX — alles sichtbar |
| wallet/ui/components | modulare UI‑Tiles | perfekt für dynamische Darstellung im Vollbild |
| wallet/ui/styles | Theme‑System (dark/light) | optische Anpassung |
| api/ | Controller‑Layer | Datenquelle für Frontend |
| global/ | Authentifizierung & Popup | Login‑System |
| public/ | statische Assets & chain.json | Chain‑Datenquelle |
| scripts/ | Build‑, Serve‑, Deploy‑Automatisierung | technische Infrastruktur |
| settings/ | Benutzer‑Einstellungen | aktuell minimal, wird erweitert |
| index.html | Home‑Dashboard | Einstiegspunkt für gesamte App |

---

🧠 möglichkeiten

1. UI‑Erweiterung (sichtbares Maß)
Wir machen:
- Explorer:  
  - chain.json wird direkt geladen → Blöcke, TXs, Hashes sichtbar.  
  - Scroll‑/Sub‑Viewer‑Integration für Details.  
  - Vollbild‑Layout (Viewport‑Grid).

- Wallet:  
  - Balance‑Tile, Mining‑Box, History, DEX werden wirklich befüllt.  
  - Layout wird vertikal gestreckt, alles sichtbar bis unten.  
  - Daten kommen aus wallet-controller.js + persistence.js.

- Home (index.html):  
  - Dashboard‑Charakter: Chain‑Status, Wallet‑Summary, Explorer‑Preview.  
  - Login‑Status sichtbar oben rechts.

---

2. Settings‑Integration
Die settings/index.html wird:
- in das globale Auth‑System eingebunden,
- als UI‑Erweiterung mit Theme‑Switch (dark/light),
- mit Account‑Optionen (PW2, Mask, Session‑Timeout).

---a

1. .gitignore

```gitignore
node_modules/
dist/
.cache/
.env
.DS_Store
npm-debug.log*
yarn-error.log*
```

---

2. package.json

```json
{
  "name": "rfof-golden-abilitychain",
  "version": "1.0.0",
  "description": "RFOF-GOLDEN AbilityChain – Explorer + Wallet (PZQQET-0 Standard)",
  "scripts": {
    "build": "node scripts/build.js",
    "serve": "node scripts/serve.js",
    "deploy": "node scripts/deploy.js"
  },
  "author": "Justin",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}
```

---

3. README.md

```markdown

RFOF-GOLDEN AbilityChain

Ein vollständiges Blockchain-Viewer- und Wallet-System basierend auf:

- RFOF-GOLDEN BOxBlock-Chain
- PZQQET-0 Standard (Maske = Seed = Identität)
- XP/Zeit Token-Ökonomie
- Explorer wie tonviewer
- Wallet mit Login, Register, Seed-Maske, XP-Mining

Struktur

- chain/ – Blockchain Core, Protocol, Explorer, Viewer
- wallet/ – Wallet UI + PZQQET-0 Engine
- api/ – Controller für Wallet, Identity, Finance, Explorer
- public/ – Manifest, Logo, Favicon
- scripts/ – Build, Serve, Deploy
`

---

4. LICENSE (MIT)

```text
MIT License

Copyright (c) 2026 @RFOF-NETWORK

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

5. .github/workflows/deploy.yml

```yaml
name: Deploy AbilityChain

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: 20

    - name: Install
      run: npm install

    - name: Build
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        githubtoken: ${{ secrets.GITHUBTOKEN }}
        publish_dir: ./dist
```

---

6. scripts/build.js

```js
import { mkdirSync, cpSync } from "node:fs";

function main() {
  mkdirSync("dist", { recursive: true });

  cpSync("wallet", "dist/wallet", { recursive: true });
  cpSync("chain", "dist/chain", { recursive: true });
  cpSync("public", "dist/public", { recursive: true });

  cpSync("index.html", "dist/index.html");
}

main();
```

---

7. scripts/serve.js

```js
import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";

const PORT = 3000;

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".ico": "image/x-icon"
};

http
  .createServer((req, res) => {
    const urlPath = req.url === "/" ? "/index.html" : req.url;
    const filePath = join(process.cwd(), urlPath.replace(/^\//, ""));

    if (!existsSync(filePath)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const data = readFileSync(filePath);
    const type = MIME[extname(filePath)] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  })
  .listen(PORT, () => {
    console.log(Serving on http://localhost:${PORT});
  });
```

---

8. scripts/deploy.js

```js
import { execSync } from "node:child_process";

function run(cmd) {
  console.log("> " + cmd);
  execSync(cmd, { stdio: "inherit" });
}

run("npm run build");
console.log("Deployment build ready in /dist.");
```

---

📌 chain/core/ledger.js

```js
// Ledger – Grundbuch der AbilityChain

export class Ledger {
  constructor() {
    this.state = new Map();        // address → { xp, time, balance }
    this.blocks = [];              // vollständige BOxBlock-Kette
  }

  initAddress(addr) {
    if (!this.state.has(addr)) {
      this.state.set(addr, { xp: 0, time: 0, balance: 0 });
    }
  }

  applyTransaction(tx) {
    this.initAddress(tx.from);
    this.initAddress(tx.to);

    const from = this.state.get(tx.from);
    const to = this.state.get(tx.to);

    if (from.balance < tx.amount) return false;

    from.balance -= tx.amount;
    to.balance += tx.amount;

    return true;
  }

  applyBlock(block) {
    for (const tx of block.transactions) {
      this.applyTransaction(tx);
    }
    this.blocks.push(block);
  }

  getState(addr) {
    return this.state.get(addr) || null;
  }
}
```

---

📌 chain/core/blocks.js

```js
// Block-Struktur der AbilityChain

import crypto from "crypto";

export class Block {
  constructor(index, prevHash, transactions, timestamp = Date.now()) {
    this.index = index;
    this.prevHash = prevHash;
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.hash = this.computeHash();
  }

  computeHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
        this.prevHash +
        JSON.stringify(this.transactions) +
        this.timestamp
      )
      .digest("hex");
  }
}
```

---

📌 chain/core/mempool.js

```js
// Mempool – unbestätigte Transaktionen

export class Mempool {
  constructor() {
    this.pool = [];
  }

  add(tx) {
    this.pool.push(tx);
  }

  drain() {
    const txs = [...this.pool];
    this.pool = [];
    return txs;
  }

  size() {
    return this.pool.length;
  }
}
```

---

📌 chain/core/consensus.js

```js
// Konsens – deterministisch, kein Mining, 0ms GoldenChain-Style

export class Consensus {
  constructor(ledger, mempool) {
    this.ledger = ledger;
    this.mempool = mempool;
  }

  createNextBlock() {
    const txs = this.mempool.drain();
    const prev = this.ledger.blocks[this.ledger.blocks.length - 1];

    const block = {
      index: prev ? prev.index + 1 : 0,
      prevHash: prev ? prev.hash : "GENESIS",
      transactions: txs,
      timestamp: Date.now()
    };

    this.ledger.applyBlock(block);
    return block;
  }
}
```

---

📌 chain/core/validators.js

```js
// Validatoren für Transaktionen und Blöcke

export const Validators = {
  tx(tx) {
    return (
      typeof tx.from === "string" &&
      typeof tx.to === "string" &&
      typeof tx.amount === "number" &&
      tx.amount >= 0
    );
  },

  block(block) {
    return (
      typeof block.index === "number" &&
      typeof block.prevHash === "string" &&
      Array.isArray(block.transactions)
    );
  }
};
```

---

📌 chain/protocol/encoding.js

```js
// Encoding – Serialisierung für Netzwerk & Storage

export const Encoding = {
  encode(obj) {
    return JSON.stringify(obj);
  },

  decode(str) {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }
};
```

---

📌 chain/protocol/schema.js

```js
// Schema-Definitionen der AbilityChain

export const Schema = {
  Transaction: {
    from: "string",
    to: "string",
    amount: "number"
  },

  Block: {
    index: "number",
    prevHash: "string",
    transactions: "array",
    timestamp: "number"
  }
};
```

---

📌 chain/protocol/network.js

```js
// Netzwerk-Schicht – lokal, später austauschbar gegen echtes P2P

export class Network {
  constructor() {
    this.peers = [];
  }

  connect(peer) {
    this.peers.push(peer);
  }

  broadcast(msg) {
    for (const peer of this.peers) {
      peer.receive(msg);
    }
  }
}
```

---

1. chain/explorer/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>AbilityChain Explorer</title>
  <link rel="stylesheet" href="explorer.css">
</head>
<body>

  <header>
    <h1>AbilityChain Explorer</h1>
    <input id="search" placeholder="Block, TX oder Adresse suchen…">
  </header>

  <main>
    <section id="latest-blocks"></section>
    <section id="latest-txs"></section>
  </main>

  <script src="explorer.js"></script>
</body>
</html>
```

---

2. chain/explorer/explorer.js

```js
// AbilityChain Explorer – zeigt Blöcke & Transaktionen

async function fetchChain() {
  const res = await fetch("/public/chain.json").catch(() => null);
  if (!res) return { blocks: [], txs: [] };
  return await res.json();
}

function renderBlock(block) {
  return `
    <div class="block">
      <h3>Block #${block.index}</h3>
      <p>Hash: ${block.hash}</p>
      <p>TXs: ${block.transactions.length}</p>
    </div>
  `;
}

function renderTx(tx) {
  return `
    <div class="tx">
      <p><strong>${tx.from}</strong> → <strong>${tx.to}</strong></p>
      <p>Amount: ${tx.amount}</p>
    </div>
  `;
}

async function update() {
  const chain = await fetchChain();

  document.getElementById("latest-blocks").innerHTML =
    chain.blocks.map(renderBlock).join("");

  document.getElementById("latest-txs").innerHTML =
    chain.txs.map(renderTx).join("");
}

update();
setInterval(update, 2000);
```

---

3. chain/explorer/explorer.css

```css
body {
  margin: 0;
  background: #0a0a0a;
  color: #fff;
  font-family: system-ui, sans-serif;
}

header {
  padding: 20px;
  background: #111;
  border-bottom: 1px solid #222;
}

search {
  width: 300px;
  padding: 10px;
  background: #222;
  border: none;
  color: #fff;
}

.block, .tx {
  background: #111;
  padding: 15px;
  margin: 10px;
  border-radius: 6px;
  border: 1px solid #222;
}
```
---

4. chain/viewer/tx-viewer.js

```js
// TX Viewer – zeigt Details einer einzelnen Transaktion

export function renderTxDetails(tx) {
  return `
    <div class="tx-details">
      <h2>Transaktion</h2>
      <p><strong>Von:</strong> ${tx.from}</p>
      <p><strong>An:</strong> ${tx.to}</p>
      <p><strong>Betrag:</strong> ${tx.amount}</p>
      <p><strong>Hash:</strong> ${tx.hash || "n/a"}</p>
    </div>
  `;
}
```

---

5. chain/viewer/block-viewer.js

```js
// Block Viewer – zeigt Details eines Blocks

import { renderTxDetails } from "./tx-viewer.js";

export function renderBlockDetails(block) {
  const txs = block.transactions.map(renderTxDetails).join("");

  return `
    <div class="block-details">
      <h2>Block #${block.index}</h2>
      <p><strong>Hash:</strong> ${block.hash}</p>
      <p><strong>Vorheriger Hash:</strong> ${block.prevHash}</p>
      <p><strong>Timestamp:</strong> ${new Date(block.timestamp).toLocaleString()}</p>

      <h3>Transaktionen</h3>
      ${txs}
    </div>
  `;
}
```

---

6. chain/viewer/styles.css

```css
body {
  background: #000;
  color: #fff;
  font-family: system-ui, sans-serif;
}

.block-details, .tx-details {
  background: #111;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  border: 1px solid #222;
}

h2, h3 {
  margin-top: 0;
}
```

---

🌐 1. wallet/index.html

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>AbilityChain Wallet (PZQQET-0)</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <header>
    <h1>AbilityChain Wallet (PZQQET-0)</h1>
  </header>

  <main>

    <section id="auth">
      <h2>Login / Account erstellen</h2>

      <div id="register-box">
        <h3>Account erstellen</h3>
        <input id="reg-user" placeholder="Username">
        <input id="reg-pw1" type="password" placeholder="Passwort">
        <input id="reg-pw2" type="password" placeholder="Passwort wiederholen">
        <select id="reg-words">
          <option value="12">12 Wörter</option>
          <option value="24">24 Wörter</option>
        </select>
        <button id="reg-btn">Account erstellen + PZQQET-Seed</button>
        <pre id="reg-seed"></pre>
      </div>

      <div id="login-box">
        <h3>Login</h3>
        <input id="login-user" placeholder="Username">
        <input id="login-pw" type="password" placeholder="Passwort">
        <button id="login-btn">Login</button>
        <pre id="login-status"></pre>
      </div>
    </section>

    <section id="wallet-ui" style="display:none;">
      <section id="balance"></section>
      <section id="mining"></section>
      <section id="history"></section>
      <section id="dex"></section>
    </section>

  </main>

  <script src="pzqqet-0_standard.js"></script>
  <script src="xp-mining.js"></script>
  <script src="time-token.js"></script>
  <script src="persistence.js"></script>

  <script src="../api/wallet-controller.js"></script>
  <script src="ui/components/balance-tile.js"></script>
  <script src="ui/components/euro-box.js"></script>
  <script src="ui/components/mining-box.js"></script>
  <script src="ui/components/tx-history.js"></script>
  <script src="ui/components/dex-buttons.js"></script>

</body>
</html>
```

---

🎨 2. wallet/styles.css

```css
body {
  margin: 0;
  background: #000;
  color: #fff;
  font-family: system-ui, sans-serif;
}

header {
  padding: 20px;
  background: #111;
  border-bottom: 1px solid #222;
}

section {
  margin: 20px;
  padding: 20px;
  background: #111;
  border-radius: 8px;
  border: 1px solid #222;
}
```

---

⚡ 3. wallet/xp-mining.js

```js
// XP Mining – Tipp-Mining Engine

export function startXPMining(onUpdate) {
  let xp = 0;
  let last = Date.now();

  document.addEventListener("click", () => {
    const now = Date.now();
    const delta = now - last;
    last = now;

    const gained = Math.floor(delta / 100);
    xp += gained;

    onUpdate(xp);
  });
}
```

---

⏳ 4. wallet/time-token.js

```js
// Zeit-Token Engine – 1 XP = 1 Zeit

export function getTimeToken() {
  return Math.floor(Date.now() / 1000);
}

export function convertXPtoTime(xp) {
  return xp;
}
```

---

💾 5. wallet/persistence.js

```js
// Persistenz Engine – lokale Speicherung

export const db = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  load(key, fallback = null) {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  }
};
```

---

💰 6. wallet/ui/components/balance-tile.js

```js
export function renderBalanceTile(balance) {
  return `
    <div class="balance-tile">
      <h2>Balance</h2>
      <p>${balance} AC</p>
    </div>
  `;
}
```

---

💶 7. wallet/ui/components/euro-box.js

```js
export function renderEuroBox(euro) {
  return `
    <div class="euro-box">
      <h2>Fiat</h2>
      <p>${euro} €</p>
    </div>
  `;
}
```

---

⛏️ 8. wallet/ui/components/mining-box.js

```js
export function renderMiningBox(xp) {
  return `
    <div class="mining-box">
      <h2>XP Mining</h2>
      <p>XP: ${xp}</p>
      <button id="mine">Tipp-Mining</button>
    </div>
  `;
}
```

---

📜 9. wallet/ui/components/tx-history.js

```js
export function renderTxHistory(txs) {
  return `
    <div class="tx-history">
      <h2>Transaktionen</h2>
      ${txs
        .map(
          tx => `
        <div class="tx">
          <p>${tx.from} → ${tx.to}</p>
          <p>${tx.amount} AC</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}
```

---

🔄 10. wallet/ui/components/dex-buttons.js

```js
export function renderDexButtons() {
  return `
    <div class="dex-buttons">
      <button>XP → Zeit</button>
      <button>Zeit → XP</button>
      <button>Zeit → Fiat</button>
      <button>Fiat → Zeit</button>
    </div>
  `;
}
```

---

🌑 11. wallet/ui/styles/dark.css

```css
body  {
  background: #000;
  color: #fff;
}
```

---

🌕 12. wallet/ui/styles/light.css

```css
body {
  background: #fff;
  color: #000;
}
```

---

📡 1. api/wallet-controller.js

```js
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
```

---

🧬 2. api/identity-controller.js

```js
// Identity-Controller – XP/Zeit Identität aus PZQQET-Maske

export function deriveIdentity(mask) {
  const address = "ACX_" + mask.slice(0, 16).toUpperCase();
  const baseXP = parseInt(mask.slice(16, 24), 16) % 1000;
  const baseTime = parseInt(mask.slice(24, 32), 16) % 1000;

  return { address, baseXP, baseTime };
}
```

---

💸 3. api/finance-controller.js

```js
// Finance-Controller – XP <-> Zeit <-> Fiat

export function xpToTime(xp) {
  return xp; // 1 XP = 1 Zeit
}

export function timeToFiat(time, ratePerUnit = 0.01) {
  return time * ratePerUnit;
}

export function fiatToTime(fiat, ratePerUnit = 0.01) {
  return fiat / ratePerUnit;
}
```

---

🔍 4. api/explorer-controller.js

```js
// Explorer-Controller – Chain-Daten abrufen & maskieren

import { Encoding } from "../chain/protocol/encoding.js";

export async function fetchChainSnapshot() {
  const res = await fetch("/public/chain.json").catch(() => null);
  if (!res) return { blocks: [], txs: [] };
  return await res.json();
}

export function maskBlockHashWithGenesis(blockHash, genesisMask) {
  return blockHash.slice(0, 32) + genesisMask.slice(0, 32);
}
```

---

🧩 5. public/manifest.json

```json
{
  "name": "AbilityChain Wallet",
  "short_name": "AbilityChain",
  "start_url": "/wallet/index.html",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "logo.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ]
}
```

---

🎨 6. public/logo.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#000"/>
  <circle cx="100" cy="100" r="70" fill="#111" stroke="#FFD700" stroke-width="4"/>
  <text x="50%" y="50%" fill="#FFD700" font-size="28" text-anchor="middle" dominant-baseline="middle">
    ACX
  </text>
</svg>
```

---

🧿 7. public/favicon.ico

Da .ico binär ist, hier der Hinweis:

👉 Man konvertiert einfach logo.svg → favicon.ico  
(z.B. über favicon.io oder ein lokales Tool)  
und legst es in:

`
public/favicon.ico
`
