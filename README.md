# RFOF-NETWORK/AbilityChain

---
```
AbilityChain/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── fork-safe.yml
│       ├── cli.yml
│       ├── pr-smartcontract.yml
│       ├── extension-deploy.yml
│       └── deploy.yml
│
├── qc/
│   ├── ability_chain.qc
│   └── dependencies.yml
│
├── quellcode-bot/
│   ├── cli.js
│   ├── qc-engine.js
│   ├── qc-parser.js
│   ├── qc-runtime.js
│   └── qc-validator.js
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
│   ├── deploy.js
│   ├── fork-detect.js
│   ├── pr-validate.js
│   └── sync-upstream.js
│
├── extensions/
│   └── example-extension/
│       └── extension.config.json
│
├── registry.json
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

---

