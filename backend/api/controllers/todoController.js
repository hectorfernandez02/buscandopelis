'use strict';
var _ = require('lodash');
var axios = require('axios')
var mongoose = require('mongoose'), coincidencias = mongoose.model('coincidencias');
 
const busqueda = async (req,res) => {
  let texto = decodeURIComponent(req.query.text);
  var busqueda = {id_genre: '', id_year: ''};
  var enviar = {};
  
   let result = await coincidencias.find();
  _.forEach(result, function(value, key) {
    if(texto.match(value.regular_exp)){
        //Definimos el tipo de busqueda encontrado
        if(value.id_genre && value.type == "busqueda_genero"){
          busqueda.id_genre = value.id_genre;
        }
        if(value.name && value.type == "busqueda_anio"){
          busqueda.id_year = value.name;
          if(parseInt(value.name) <= 2015){
            enviar.mensaje = 'Aún estoy aprendiendo, te dejo estas recomendaciones un poco viejitas';
          }
        }
      }
  });
  if(busqueda.id_genre !== '' || busqueda.id_year !== ''){
      enviar =  await conectar_api(busqueda);
      enviar.exito = 1;
  }else{
      enviar.error = 700
  }
  if(enviar.error){
    if(enviar.error === 401){
      enviar.mensaje = 'Tus gustos son un poco diferentes, aún no tengo esas categorias almacenadas';
    }
    if(enviar.error === 700){
      enviar.mensaje = 'No tengo bolita de cristal, pero si me detallas más te podré entender :D';
    }
    //devolvemos un error
  }

  return enviar;

}
const conectar_api = async (parametros) => {
  var api = 'https://api.themoviedb.org/3/discover/movie?api_key=c13742c61a927a58cc9199f571b53afa&language=es-ES&vote_average.gte=6.0';
  var respuesta = {};
  if(parametros !== null){
    if(parametros.id_genre != ''){
      api = api +'&with_genres='+parametros.id_genre;
    }
    if(parametros.id_year != ''){
      api = api +'&year='+parametros.id_year;
    }
  }
  
    await axios.get(api)
      .then(function(response) {
        respuesta.peliculas = response.data.results;
      })
      .catch( function (response) {
        respuesta.error = 401;
      })
      return respuesta;
}
const categorias = async () => {
  var respuesta = {};
  var api = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c13742c61a927a58cc9199f571b53afa&language=es-ES';
      await axios.get(api)
      .then(function(response) {
        respuesta.categorias = response.data.genres;
      })
      .catch( function (response) {
        respuesta.error = 401;
      })
      return respuesta;
}

exports.categorias = categorias;
exports.movies = busqueda;