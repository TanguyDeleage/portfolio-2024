import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { startRouter } from './router.js'

startRouter()
createApp(App).mount('#app')
