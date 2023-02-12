import {defineComponent} from 'vue';
import s from './First.module.scss';
import icon from '../../assets/icons/piggy.svg';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';

export const First = defineComponent({
  setup: () => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img src={icon} alt=""/>,
          title: () => <h2>会挣钱<br/>还会省钱</h2>,
          buttons: () => <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink to="/welcome/2">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    );
  }
});