import {defineComponent, PropType} from 'vue';
import s from './Icon.module.scss';

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props) => {
    return () =>
      <svg class={s.svg}>
        <use xlinkHref={'#' + props.name}/>
      </svg>;
  }
});