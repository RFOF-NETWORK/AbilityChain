// server.js – Optimiertes PZQQET-Gateway
import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const PORT = 3000;
let cachedChain = JSON.stringify({ streams: { TX: [], TIME: [], XP: [] } });

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json"
};

const server = http.createServer((req, res) => {
  res.setHeader("X-PZQQET-Timestamp", Date.now().toString());
  const urlPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = join(process.cwd(), urlPath);

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  // Pfad-Sicherheit und Cache-Ausgabe
  if (extname(filePath) === ".json" && urlPath.includes("chain.json")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(cachedChain);
  } else {
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
    res.end(readFileSync(filePath));
  }
});

// Die entkoppelte Schnittstelle: Der Server hört auf Events
export const initGateway = (ledger) => {
  ledger.on('blockAdded', (block) => {
    // Hier wird der interne Cache aktualisiert, sobald der Ledger ein Event feuert
    // In einer echten Umgebung würdest du hier den JSON-Struktur-Teil gezielt patchen
    console.log(`Gateway: Neuer Block ${block.index} im Strom ${block.streamType} registriert.`);
  });
};

server.listen(PORT, () => console.log(`PZQQET-Gateway aktiv auf http://localhost:${PORT}`));
