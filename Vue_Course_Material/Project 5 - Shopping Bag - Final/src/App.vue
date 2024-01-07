<template>
  <div id="nav">
    <router-link to="/">Home</router-link> -
    <router-link to="/basket">Shopping Bag ({{this.productsInBag.length}})</router-link> 
  </div>

  <!-- display component from the route using router-view  -->
  <router-view/>
</template>

<script>

  import { mapState } from 'vuex'
  export default {
    
    // on the first run, load products and load shopping bag
    created() {
      // In the vue component, invoke actionsn using .dispatch() where argument is the name of the action
      this.$store.dispatch('loadProducts');
      this.$store.dispatch('loadBag');
    },

    // get productsInBag state
    computed: mapState([
      'productsInBag' 
    ]),

  }
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1280px;
  margin: 80px auto;
}

#nav {
  padding: 16px 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgb(37, 37, 37);
  color: white;


  a {
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: #007bff;
    }
  }
}
</style>
