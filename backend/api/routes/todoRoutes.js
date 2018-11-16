'use strict';
var axios = require('axios')
var appRouter = function(app) {
  var todoPeli = require('../controllers/todoController');

  app.get('/movies', function(req, res, next) {
  	todoPeli.movies(req)
  	.then(resultado => {
  		res.send(resultado);
  	})
  	.catch(error => console.log(error));

	});
  	app.get('/categories', function(req, res, next) {
  	todoPeli.categorias(req)
  	.then(resultado => {
  		res.send(resultado);
  	})
  	.catch(error => console.log(error));

	});

	app.get("/", function(req, res) {
	    res.send("Hi Movies List check URL /movies/");
	});
	
};

module.exports = appRouter;