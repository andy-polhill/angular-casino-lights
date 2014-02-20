var express = require('express')
, http = require('http')
, app = express()
, server = http.createServer(app);

app.use(express.static(__dirname));

app.get("/", function(request, response){ //root dir
  response.render('index.html');
});

server.listen(80);
