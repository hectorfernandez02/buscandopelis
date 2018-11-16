'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CoincidenciasSchema = new Schema({
  name: {
    type: String,
    required: 'Nombre de la coincidencia'
  },
  type: {
    type: String,
    enum: ['busqueda_genero', 'busqueda_anio', 'busqueda_relevante'],
    default: ['busqueda_genero']
  },
  regular_exp: {
    type: String,
    required: 'Expresion regular para busqueda'
  },
  id_genre: {
    type: Number
  }
});

module.exports = mongoose.model('coincidencias', CoincidenciasSchema);