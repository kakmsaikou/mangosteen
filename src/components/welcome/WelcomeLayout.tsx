import {defineComponent} from 'vue';
import s from './Welcomelayout.module.scss';

export const WelcomeLayout = defineComponent({
  setup: (props, {slots}) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          {slots.icon?.()}
          {slots.title?.()}
        </div>
        <div class={s.actions}>
          {slots.buttons?.()}
        </div>
      </div>
    );
  }
});