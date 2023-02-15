import {defineComponent, PropType} from 'vue';
import s from './Icon.module.scss';

export type IconName = string

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true
    }
  },
  setup: (props) => {
    return () =>
      <svg class={s.icon}>
        <use xlinkHref={'#' + props.name}/>
      </svg>;
  }
});