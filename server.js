var express  = require('express')
var open = require('open')


app = express()
app.use(express.static(__dirname + '/output'));
var port = "9923"
app.listen(port)
open('http://127.0.0.1:' + port );
