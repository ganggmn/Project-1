const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    
    let filePath = req.url === "/" ? "./index.html" : "." + req.url;
    let extname = String(path.extname(filePath)).toLowerCase(); 
    let contentType = "text/html";

    const mimeTypes = {
        ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    };

    if (mimeTypes[extname]) {
        contentType = mimeTypes[extname];
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500);
            res.end("server Error: "+error.code);
        } else {
            res.writeHead(200, {"Content-Type": contentType});
            res.end(content, "utf-8");
        }
    });
});

const PORT = 8081;
server.listen(PORT, ()=> {
    console.log(`서버는 현재 ${PORT}로 오픈중`);
})