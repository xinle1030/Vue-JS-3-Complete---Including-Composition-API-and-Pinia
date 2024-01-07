import { createStore } from 'vuex'
import axios from 'axios'

// store information of the application
export default createStore({
  // data properties / source of truth that drives the app
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts (state, products) {
      // access to state from mutations
      state.products = products;
    },
    loadBag (state, products) {
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id); // removing product with the productId
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
  },

  // for state to change in reaction to user inputs from the view
  actions: {

    // to send data from action, we need to use commit method to pass to mutations, and finally load into state
    // commit argument is a method
    loadProducts({ commit }) {
      axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        // use commit method to call to mutation
        commit('loadProducts', response.data);
      })
    },

    loadBag({ commit }) {
     // get products from products in bag stored in local storage
      if (localStorage.getItem("productsInBag")) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")));
      }
      
    },

    // need another argument product to add to bag
    addToBag({ commit }, product) {
      commit('addToBag', product);
    },

    removeFromBag({ commit }, productId) {
      if (confirm('Are you sure you want to remove the item from bag?')) {
        commit('removeFromBag', productId);
      }
    },
    
  },
  modules: {
  }
})
