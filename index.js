// console.log("hello from node.js");
// const person = require("./person");
// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', (data) => console.log('Called Listener: ', data));

// logger.log('hello world');


const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // if(req.url === '/api/users'){
    //     // fs.readFile(
    //     //     path.join(__dirname, 'public', 'index.html'), 
    //     //     (err, content) => {
    //     //         if (err) throw err;
    //     //         res.writeHead(200, {'Content-Type': 'text/html'});
    //     //         res.end(content);
    //     //     }
    //     // );
    //     const users = [
    //         {name : 'bob Smith', age: 40},
    //         {name : 'bob Smith', age: 40}
    //     ];
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }


    //dynamic file path

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    let extName = path.extname(filePath);

    let contentType = 'text/html';

    switch (extName) {
        case '.js' : 
            contentType = "text/javascript";
            break;
        case '.png' : 
            contentType = "img/png";
            break;
        case '.css' : 
            contentType = "text/css";
            break;
    }

    //read file
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf-8');
                })
            }
            else {
                //some server error
                res.writeHead(500);
                res.end(`server error ${err.code}`);
            }
        }
        else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));