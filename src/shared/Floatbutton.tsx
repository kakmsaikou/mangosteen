import {defineComponent} from 'vue';
import {Icon} from './Icon';
import s from './Floatbutton.module.scss'

export const Floatbutton = defineComponent({
  setup: () => {
    return () => (
      <div class={s.floatButton}>
        <Icon class={s.icon} name='add'/>
      </div>
    );
  }
});