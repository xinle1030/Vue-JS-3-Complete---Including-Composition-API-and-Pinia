import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// import axios package here
import axios from 'axios'
import VueAxios from 'vue-axios'


createApp(App)
.use(store)
.use(VueAxios, axios) // ask the app to use axios b4 mounting
.mount('#app');       // mount last

