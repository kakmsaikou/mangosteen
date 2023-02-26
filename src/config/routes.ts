import { RouteRecordRaw } from 'vue-router';
import { ItemList } from '../components/item/ItemList';
import { ItemsPage } from '../views/ItemsPage';
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
import { StartPage } from '../views/StartPage';
import { TagPage } from '../views/TagPage';
import { TagEdit } from '../components/tag/TagEdit';
import { TagCreate } from '../components/tag/TagCreate';
import { SignInPage } from '../views/SignInPage';
import { StatisticsPage } from '../views/StatisticsPage';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: './welcome' },
  {
    path: '/welcome',
    component: WelcomePage,
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
  { path: '/start', component: StartPage },
  {
    path: '/items',
    component: ItemsPage,
    children: [
      { path: '', component: ItemList },
      { path: 'create', component: ItemCreate },
    ],
  },
  {
    path: '/tags',
    component: TagPage,
    children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit },
    ],
  },
  {
    path: '/sign_in', component: SignInPage
  },{
    path: '/statistics', component: StatisticsPage
  }
];
