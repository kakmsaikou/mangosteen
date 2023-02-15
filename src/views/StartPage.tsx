import {defineComponent} from 'vue';
import {Button} from '../shared/Button';
import s from './StartPage.module.scss';
import {Floatbutton} from '../shared/Floatbutton';

export const StartPage = defineComponent({
  setup: () => {
    const onclick = () => {
      console.log('111');
    };
    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onclick}>开始记账</Button>
        </div>
        <Floatbutton iconName='add'/>
      </div>
    );
  }
});