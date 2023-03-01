import { fetchLoggedStatus, loggedStatusPromise } from './shared/me';
import { routes } from './config/routes';
import { createApp } from 'vue';
import { App } from './App';
import { createRouter } from 'vue-router';
import { history } from './shared/history';
import '@svgstore';

const router = createRouter({ history, routes });

fetchLoggedStatus();

router.beforeEach(to => {
  if (
    ['/', 'start'].includes(to.path) ||
    to.path.startsWith('/welcome') ||
    to.path.startsWith('/sign_in')
  ) {
    return true;
  } else {
    return loggedStatusPromise!.then(
      () => true,
      () => '/sign_in?return_to' + to.path
    );
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
