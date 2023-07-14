import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { defineRule } from 'vee-validate';
import veeRules from '@vee-validate/rules';
import Toaster from "@meforma/vue-toaster";

Object.keys(veeRules).forEach(rule => {
    defineRule(rule, veeRules[rule]);
});

store.state.user.token ? axios.defaults.headers.common['Authorization'] = 'Bearer '+ store.state.user.token : ''

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Toaster)
app.mount('#app')
