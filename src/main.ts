import { routes } from './config/routes';
import { createApp } from 'vue';
import { App } from './App';
import { createRouter } from 'vue-router';
import { history } from './shared/history';
import '@svgstore';
import { createPinia } from 'pinia';
import { useMeStore } from './stores/useMeStore';

const router = createRouter({ history, routes });

const app = createApp(App);
const pinia = createPinia();
app.use(pinia).use(router);
app.mount('#app');

const meStore = useMeStore();
meStore.fetchMe();
router.beforeEach(to => {
  if (
    ['/', 'items'].includes(to.path) ||
    to.path.startsWith('/welcome') ||
    to.path.startsWith('/sign_in')
  ) {
    return true;
  } else {
    return meStore.mePromise!.then(
      () => true,
      () => '/sign_in?return_to' + to.path
    );
  }
});
