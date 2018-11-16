<template>
  <div id="app">
    <Header/>
    
    <Busqueda/>
    <Footer/>
  </div>
</template>

<script>
import Busqueda from './components/Busqueda.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Busqueda, Header,Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
