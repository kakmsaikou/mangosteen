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
      <svg class={s.svg}>
        <use xlinkHref={'#' + props.name}/>
      </svg>;
  }
});