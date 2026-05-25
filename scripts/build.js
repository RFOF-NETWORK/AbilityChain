// scripts/build.js – Etablierung des PZQQET-0 Deployment-Standards

import { mkdirSync, cpSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

function main() {
  const dist = "dist";
  mkdirSync(dist, { recursive: true });

  // 1. Asset-Synchronisation
  const targets = ["wallet", "chain", "public", "global", "settings", "scripts"];
  targets.forEach(target => {
    cpSync(target, path.join(dist, target), { recursive: true });
  });
  cpSync("index.html", path.join(dist, "index.html"));

  // 2. Initialisierung des fraktalen Daten-Grundzustands
  const chainPath = path.join(dist, "public", "chain.json");
  if (!existsSync(chainPath)) {
    const genesisData = {
      genesisHash: "GENESIS-PZQQET-0000000000",
      streams: { TX: [], TIME: [], XP: [] },
      mempool: { TX: [], TIME: [], XP: [] },
      consensus: { algorithm: "PZQQET-0", version: "fractal-v1" }
    };
    writeFileSync(chainPath, JSON.stringify(genesisData, null, 2));
    console.log("Build: Fraktale Genesis-Struktur in dist/public/chain.json etabliert.");
  }
}

main();
