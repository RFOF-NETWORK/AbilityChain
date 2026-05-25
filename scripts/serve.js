import http from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const PORT = 3000;
// Einfacher In-Memory Cache für die chain.json, um IO-Locks zu vermeiden
let cachedChain = null;

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json"
};

const server = http.createServer((req, res) => {
  // Zeit-Synchronisations-Header für PZQQET-Standard
  res.setHeader("X-PZQQET-Timestamp", Date.now().toString());

  const urlPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = join(process.cwd(), urlPath);

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  // Atomares Lesen der chain.json über Cache
  if (extname(filePath) === ".json" && urlPath.includes("chain.json")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(cachedChain || readFileSync(filePath));
  } else {
    const data = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  }
});

// Update-Funktion für den Cache (wird vom Konsens aufgerufen)
export const updateCache = (newData) => {
  cachedChain = JSON.stringify(newData);
};

server.listen(PORT, () => {
  console.log(`PZQQET-Gateway läuft auf http://localhost:${PORT}`);
});
