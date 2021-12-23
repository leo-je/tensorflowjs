// mock/index.js
const http = require('http');
const processRequest = require('./service');
const port = 3001;

const httpServer = http.createServer((req, res) => {
  processRequest(req, res)
})

httpServer.listen(port, () => {
  console.log(`app is running at port: ${port}`);
});