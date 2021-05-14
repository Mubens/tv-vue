import { createApp } from 'vue';
import App from './App.vue';
import router from './route';
import VueLazyload from 'vue3-lazyload';

const loadingImg = require('@/assets/images/img_loading.png');

const lazyOptions = {
  loading: loadingImg,
  error: loadingImg
};

createApp(App)
  .use(router)
  .use(VueLazyload, lazyOptions)
  .mount('#app');
