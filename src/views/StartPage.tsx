import {defineComponent} from 'vue';
import {Button} from '../shared/Button';
import {Floatbutton} from '../shared/Floatbutton';
import {Center} from '../shared/Center';
import {Icon} from '../shared/Icon';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup: () => {
    const onclick = () => {
      console.log('111');
    };
    return () => (
      <div>
        <nav>menu</nav>
        <Center class={s.piggy_wrapper}>
          <Icon class={s.piggy} name="piggy"/>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onclick}>开始记账</Button>
        </div>
        <Floatbutton iconName="add"/>
      </div>
    );
  }
});