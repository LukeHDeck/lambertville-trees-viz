#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const args = process.argv.slice(2);
const rootDir = path.resolve(process.cwd(), args[0] || 'src');
const port = Number(process.env.PORT || args[1] || 8000);

if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
  console.error(`Cannot start server: \"${rootDir}\" is not a directory.`);
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.glb': 'model/gltf-binary',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  const filePath = path.join(rootDir, pathname);

  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Serving ${rootDir} at http://localhost:${port}`);
  console.log('Press Ctrl+C to stop the server.');
});
