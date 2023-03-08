import { RouteRecordRaw } from 'vue-router';
import { ItemList } from '../components/item/ItemList';
import { ItemCreate } from '../components/item/ItemCreate';
import { First } from '../components/welcome/First';
import { Second } from '../components/welcome/Second';
import { Third } from '../components/welcome/Third';
import { Fourth } from '../components/welcome/Fourth';
import { WelcomePage } from '../views/WelcomePage';
import { FirstActions } from '../components/welcome/FirstActions';
import { SecondActions } from '../components/welcome/SecondActions';
import { ThirdAction } from '../components/welcome/ThirdActions';
import { FourthActions } from '../components/welcome/FourthActions';
import { TagEdit } from '../components/tag/TagEdit';
import { TagCreate } from '../components/tag/TagCreate';
import { http } from '../shared/Http';
import { ComingSoon } from '../shared/ComingSoon';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: './welcome' },
  {
    path: '/welcome',
    component: WelcomePage,
    // 这里用懒加载会报错，原因不明
    // component: () => import('../views/WelcomePage'),
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skipFeatures') === 'yes'
        ? next('/items')
        : next();
    },
    children: [
      { path: '', redirect: '/welcome/1' },
      {
        path: '1',
        name: 'Welcome1',
        components: { main: First, footer: FirstActions },
      },
      {
        path: '2',
        name: 'Welcome2',
        components: { main: Second, footer: SecondActions },
      },
      {
        path: '3',
        name: 'Welcome3',
        components: { main: Third, footer: ThirdAction },
      },
      {
        path: '4',
        name: 'Welcome4',
        components: { main: Fourth, footer: FourthActions },
      },
    ],
  },
  {
    path: '/items',
    component: () => import('../views/ItemsPage'),
    beforeEnter: async (to, from, next) => {
      await http.get('/me').catch(() => {
        next('/sign_in?return_to=' + to.path);
      });
      next();
    },
    children: [
      { path: '', component: ItemList },
      { path: 'create', component: ItemCreate },
    ],
  },
  {
    path: '/tags',
    component: () => import('../views/TagPage'),
    children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit },
    ],
  },
  {
    path: '/sign_in',
    component: () => import('../views/SignInPage'),
  },
  {
    path: '/statistics',
    component: () => import('../views/StatisticsPage'),
  },
  {
    path: '/export',
    component: ComingSoon,
  },
  {
    path: '/notify',
    component: ComingSoon,
  },
];
