var express = require("express");
var fs = require('fs');
var app = express();
app.use(express.logger());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/public/aura-not.html', 'utf8', function(err, text){
        res.send(text);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});