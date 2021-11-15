
var http = require("http");
var cluster = require("cluster");
var os = require('os');

if (cluster.isMaster) {
    for ( var i = 0 ; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    var server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from ${process.pid}`);
    });

    server.listen(8081, () => {
        console.log(`SErver is listing at 8081 ${process.pid}`);
    });
}