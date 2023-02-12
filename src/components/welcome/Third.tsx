import {defineComponent} from 'vue';
import s from './First.module.scss';
import icon from '../../assets/icons/chart.svg';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';

export const Third = defineComponent({
  setup: () => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img src={icon} alt=""/>,
          title: () => <h2>每日提醒<br/>不遗漏每一笔账单</h2>,
          buttons: () => <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink to="/welcome/4">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    );
  }
});