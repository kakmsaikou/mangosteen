import {defineComponent, PropType} from 'vue';
import {Icon, IconName} from './Icon';
import s from './Floatbutton.module.scss'

export const Floatbutton = defineComponent({
  props: {
    iconName: {
      type: String as PropType<IconName>,
      required: true
    }
  },
  setup: (props) => {
    return () => (
      <div class={s.floatButton}>
        <Icon class={s.icon} name={props.iconName}/>
      </div>
    );
  }
});