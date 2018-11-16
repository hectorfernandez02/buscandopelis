import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    descripcion: '',
    mensaje: '¿Qué tipo de Película te gustaría ver Hoy?, escribe un año, genero o categoria...',
    peliculas:[],
    categorias: []
  },
  getters: {
    islogin: (state, getters) => {
      if (getters.idactual > 0) {
        return true
      } else {
        return false
      }
    },
    mensaje: state => {
      return state.mensaje;
    },
    peliculas: state => {
      return state.peliculas;
    },
    categorias: state => {
      return state.categorias;
    },
    categorias_pelicula: (state, getters) => (lista) => {
      var resultado = new Object();
      if (parseInt(lista.length) > 0) {
        _.forEach(lista, function(value) {
          var actual = value.id;
          var categorias = state.categorias;
          return categorias;
          var filtro = _.filter(categorias, ['id', actual] );
          if(filtro !== null){
            resultado.push(filtro[0].name);
          }
        });
      }else{
        var categorias = state.categorias;
        var filtro = _.filter(categorias, ['id', lista]);
        if(filtro !== null){
            resultado.push(filtro[0].name);
        }
      }
      return _.slice(categorias, 0, 2);
    }
  },
  mutations: {
    SET_PELICULAS_MUTATION: function (state, data) {
      Vue.set(state, 'peliculas', data);
    },
    SET_CATEGORIAS_MUTATION: function (state, data) {
      Vue.set(state, 'categorias', data);
    },
    SET_MENSAJE_MUTATION: function (state, data) {
      Vue.set(state, 'mensaje', data);
    },
    initialiseStore (state) {
      if (localStorage.getItem('movies')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('movies')))
        )
      }
    },
  },
  actions: {
    SET_PELICULAS: function (context, data) {
      context.commit('SET_PELICULAS_MUTATION', data)
    },
    SET_CATEGORIAS: function (context, data) {
      context.commit('SET_CATEGORIAS_MUTATION', data)
    },
    SET_MENSAJE: function (context, data) {
      context.commit('SET_MENSAJE_MUTATION', data)
    },
  },
  modules: { },
  strict: debug
})
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('movies', JSON.stringify(state))
})
export default store
