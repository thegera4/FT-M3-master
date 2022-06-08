var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req, res) => { 
   fs.readFile("./images" + req.url + ".jpg", (err, img) =>{
    if(err){
      res.writeHead(404, {"Content-Type": "text/plain"})
      res.end("404 Image Not Found")
      console.log(err)
    }else{
      res.writeHead(200, {"Content-Type": "image/jpeg"})
      res.end(img)
    }
  });
}).listen(1337, '127.0.0.1');

