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
