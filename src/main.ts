import { createApp, App as Application } from 'vue'
import router from "./router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';
import App from './App.vue'
import './style/main.css'

let app: Application;

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App).use(router)
    app.mount('#app')
  }
})