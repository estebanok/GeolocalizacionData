// Cargamos módulos Node
var express = require('express');
var http = require('http');

// Creamos aplicación, servidor y sockets
var app = express();
var server = require('http').createServer(app);
var io=require('socket.io').listen(server);


// Configuramos la aplicación, ver http://expressjs.com/api.html
app.set('views', __dirname + '/view');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


// Routing
app.get('/', function(req, res) {
    res.render('layout', {
        title: 'Mapa en tiempo real',
        description: 'Mi primer mapa'
    });
});

//Iniciamos el server en el puerto 3000
server.listen(3000);

console.log('Servidor de node.js en el servidor local');