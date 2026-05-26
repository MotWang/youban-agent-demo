#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = __dirname;
const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, '').split('=');
    return [key, rest.join('=') || true];
  })
);

const port = Number(args.get('port') || process.env.PORT || 5173);
const host = args.get('host') || process.env.HOST || '127.0.0.1';
const shouldOpen = args.get('open') !== false && args.get('no-open') !== true;
const openPath = normalizeUrlPath(String(args.get('open') || '/'));

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  const pathname = normalizeUrlPath(req.url || '/');

  if (pathname === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = decodeURIComponent(filePath);
  const absolutePath = path.resolve(rootDir, `.${filePath}`);

  if (!absolutePath.startsWith(rootDir)) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.stat(absolutePath, (statError, stats) => {
    if (statError) {
      send(res, 404, 'Not found');
      return;
    }

    const targetPath = stats.isDirectory()
      ? path.join(absolutePath, 'index.html')
      : absolutePath;

    fs.readFile(targetPath, (readError, data) => {
      if (readError) {
        send(res, 404, 'Not found');
        return;
      }

      const ext = path.extname(targetPath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': contentTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(data);
    });
  });
});

server.listen(port, host, () => {
  const baseUrl = `http://${host}:${port}`;
  const launchUrl = `${baseUrl}${encodeURI(openPath)}`;
  console.log(`YouBan demo is running: ${baseUrl}`);
  console.log(`Open: ${launchUrl}`);
  console.log('Press Ctrl+C to stop.');

  if (shouldOpen) {
    openBrowser(launchUrl);
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Try: npm start -- --port=5174`);
  } else {
    console.error(error.message);
  }
  process.exit(1);
});

function normalizeUrlPath(value) {
  const pathname = String(value).split('?')[0].split('#')[0] || '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

function send(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(message);
}

function openBrowser(url) {
  const platform = process.platform;
  const command = platform === 'darwin' ? 'open' : platform === 'win32' ? 'cmd' : 'xdg-open';
  const argsForPlatform = platform === 'win32' ? ['/c', 'start', '', url] : [url];
  const child = spawn(command, argsForPlatform, {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
}
