<template>
  <div id="pelicula" class="row">
    <div class="col-4">
      <img class="img-poster img-fluid" v-bind:src="img"/>
    </div>
    <div class="col-8">
      <h3 class="titulo">{{titulo}}</h3>
      <div class="row">
        <span class="anio">{{anio}}</span>
        <span class="categoria"  v-for="(value,key) in categorias" :key="key">{{value}}</span>
      </div>
      <div class="row">
        <p class="texto">
          {{resumen}}
        </p>
      </div>
      <div class="row">
        <button type="button" class="btn btn-secondary btn-leer btn-lg">Escuchar resumen</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Pelicula',
  props:['data'],
  computed: {
    categorias () {
      var actual = this.data.genre_ids;
      actual = this.$store.getters.categorias_pelicula(actual);
      return actual;
    },
    resumen () {
      if(this.data){
          return this.data.overview
      }
    },
    titulo () {
      if(this.data){
          return this.data.title
      }
    },
    anio () {
      var fecha = new Date(this.data.release_date);
      return fecha.getFullYear();
    },
    img () {
      return 'https://image.tmdb.org/t/p/w200/'+this.data.poster_path;
    }
    
  }
}
</script>
<style scoped>
#pelicula{
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.img-poster{
  margin-top: 10%;
}
.titulo{
  font-size: 19px;
  margin-bottom: 13px;
  flex-shrink: 0;
  overflow: hidden;
  color: #fff;
  font-family: 'Muli', sans-serif;
  font-weight: 700;
  text-align: left;
  line-height: 24px;
}
.texto{
  line-height: 18px;
  font-size: 14px;
  max-height: 110px;
  overflow: hidden;
  font-family: 'Muli', sans-serif;
  font-weight: 400;
  text-align: left;
}
.anio{
  line-height: 15px;
  font-size: 16px;
  max-height: 90px;
  overflow: hidden;
  font-family: 'Muli', sans-serif;
  padding-left: 10px;
  color: #02c39a;
font-weight: 600;
}
.categoria{
  line-height: 16px;
  font-size: 13px;
  overflow: hidden;

font-family: 'Muli', sans-serif;

color: #fff;

font-weight: 400;

background: #ffffff1a;

border-radius: 5px;

padding-left: 5px;

padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  margin-left: 5px;
}
.btn-leer{
  background: none;
  border-color: #3a506b;
  padding: 14px 0;
  width: 190px;
  outline: none;
  border-radius: 60px;
  -webkit-transition: background .1s,border-color .1s;
  transition: background .1s,border-color .1s;
  cursor: pointer;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 1px;
  color: #fff;
  font-family: 'Muli', sans-serif;
  font-weight: 600;
  margin-left: 10px;
}

</style>
