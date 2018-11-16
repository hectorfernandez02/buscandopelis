<template>
  <div id="busqueda">
    <div class="col-sm-10 col-md-6 offset-md-3 offset-sm-1">
      <div class="row">
        <Pregunta/>
      </div>
    </div>
    <div class="col-sm-10 col-md-10 offset-md-1 offset-sm-1">
      <div class="row">
          <div class="col-6" v-for="(value) in this.listaPeliculas" :key="value.id">
            <Pelicula :data="value"/>
          </div>
      </div>
      <!---
      <div class="row">
        <div class="col-5">
          <Pelicula/>
        </div>
        <div class="col-5  offset-md-1 offset-sm-1">
          <Pelicula/>
        </div>
         <div class="col-5">
          <Pelicula/>
        </div>
        <div class="col-5  offset-md-1 offset-sm-1">
          <Pelicula/>
        </div>
        
      </div>
      -->
    </div>

  </div>
</template>

<script>
import Pregunta from './Pregunta.vue'
import Pelicula from './Pelicula.vue'

export default {
  name: 'Busqueda',
  components: {
    Pregunta,Pelicula
  },
  props: {
    msg: String
  },
  computed: {
    listaPeliculas: function () {
      if(this.$store.getters.peliculas){
        return this.$store.getters.peliculas;
      }
    }
  }
}
</script>
<style scoped>
#busqueda{
  min-height: 300px;
  background-color: #1c2541;
  color: #fff;
}

</style>
