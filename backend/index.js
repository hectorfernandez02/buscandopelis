var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
  
  var port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Coincidencia = require('./api/models/todoModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://usuariodemo:clave1234@ds037688.mlab.com:37688/intencionesai', { useNewUrlParser: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoRoutes'); //importing route
routes(app); //register the route


app.listen(3000, function () {
  console.log('Web Server PELICULAS listen in 3000')
})

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});