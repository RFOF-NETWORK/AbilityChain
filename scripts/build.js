import { mkdirSync, cpSync } from "node:fs";

function main() {
  mkdirSync("dist", { recursive: true });

  // Kernmodule
  cpSync("wallet", "dist/wallet", { recursive: true });
  cpSync("chain", "dist/chain", { recursive: true });
  cpSync("public", "dist/public", { recursive: true });

  // Globale Engine (auth.js + popup.html)
  cpSync("global", "dist/global", { recursive: true });

  // Settings-Seite
  cpSync("settings", "dist/settings", { recursive: true });

  // Build-/Tool-Skripte
  cpSync("scripts", "dist/scripts", { recursive: true });

  // Root-Index
  cpSync("index.html", "dist/index.html");
}

main();
