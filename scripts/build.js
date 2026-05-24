import { mkdirSync, cpSync } from "node:fs";

function main() {
  mkdirSync("dist", { recursive: true });

  cpSync("wallet", "dist/wallet", { recursive: true });
  cpSync("chain", "dist/chain", { recursive: true });
  cpSync("public", "dist/public", { recursive: true });

  cpSync("index.html", "dist/index.html");
}

main();
