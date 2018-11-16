<template>
  <div id="pregunta" class="col-12">
    <div class="row">
      <h2 class="txt-pregunta">{{texto_pregunta}}</h2>
    </div>
    <div class="row">
      <div class="col-9">
        <input type="text" name="pregunta" class="input-buscar" v-model="pregunta">
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-secondary btn-buscar btn-lg" v-on:click="buscarInformacion()">Buscar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Pregunta',
  props: {
    msg: String
  }, 
  data () {
    return {
      pregunta: ''
    }
  },
  computed: {
    texto_pregunta: function () {
      return this.$store.getters.mensaje;
    }
  },
  methods: {
    buscarInformacion(){
      if(this.pregunta !== ''){
      this.$store.dispatch('SET_PELICULAS', []);
      this.$store.dispatch('SET_MENSAJE', 'Estoy buscando...');
        axios.get(this.$apibase+'movies/', {
              params: {
                'text': this.pregunta
              }
            })
            .then( response => this.procesarRespuesta(response),  response => this.errorRespuesta(response) )
            .catch( response => this.errorRespuesta(response))
      }
    },
    procesarRespuesta: function (response){
      if(response.data.exito){
        this.$store.dispatch('SET_PELICULAS', response.data.peliculas);
        if(response.data.mensaje){
          this.$store.dispatch('SET_MENSAJE', response.data.mensaje);  
        }else{
          this.$store.dispatch('SET_MENSAJE', 'Te recomiendo estas opciones:');  
        }
      } else {
        if(response.data.mensaje){
          this.$store.dispatch('SET_MENSAJE', response.data.mensaje);  
        }else{
          this.$store.dispatch('SET_MENSAJE', 'No puedo entender tu pregunta, ¿Podrías ampliarla?');
        }
        
      }
    },
    errorRespuesta: function (response){
      console.log(response);
    }

  }
}
</script>
<style scoped>
#pregunta{
}
.txt-pregunta{
  color: #ededed;
  font-family: 'Muli', sans-serif;
  font-size: 36px;
  line-height: 40px;
  font-weight: 700;
  padding: 15px;
  margin-bottom: 5px;
}
.btn-buscar{
  background: #02c39a;
  border-color: #00a896;
  padding: 14px 0;
  width: 100%;
  outline: none;
  border-radius: 60px;
  transition: background .1s,border-color .1s;
  cursor: pointer;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 1px;
  color: #fff;
  font-family: 'Muli', sans-serif;
  font-weight: 400;
}
.input-buscar{
  cursor: text;
  width: 100%;
  color: #0b132b;
  display: inline-block;
  border: 1px solid #cfd4db;
  border-radius: 2rem;
  font-size: .9rem;
  line-height: 1.8em;
  padding: 0 .5rem 0 2rem;
  outline: none;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  font-size: 25px;
  font-weight: 700;
}
.input-buscar:focus{
  cursor: auto;
  border-color: #02c39a;
}

</style>
