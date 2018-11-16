import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store/index.js'
import axios from 'axios'
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$apibase = 'http://127.0.0.1:3000/';

new Vue({
	store,
	render: h => h(App),
	beforeCreate () {
    this.$store.commit('initialiseStore');
    this.$store.dispatch('SET_PELICULAS', []);
    this.$store.dispatch('SET_MENSAJE', '¿Que tipo de Película quieres ver Hoy? escribe un año, categoría...');
    axios.get(this.$apibase+'categories/')
            .then( response => this.$store.dispatch('SET_CATEGORIAS', response.data.categorias))
            .catch( response => console.log('error load categories'))
	}
}).$mount('#app')
