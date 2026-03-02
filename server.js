const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  if (extname === '.css') contentType = 'text/css';
  if (extname === '.js') contentType = 'text/javascript';
  if (extname === '.png') contentType = 'image/png';
  if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
  if (extname === '.gif') contentType = 'image/gif';
  if (extname === '.svg') contentType = 'image/svg+xml';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://192.168.0.113:${PORT}`);
  console.log(`Also accessible at http://localhost:${PORT}`);
});
