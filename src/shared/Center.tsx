import {defineComponent, PropType} from 'vue';
import s from './Center.module.scss';

export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<'row' | 'column'>,
      default: 'row'
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={[s.center, props.direction === 'row' ? s.row : s.column]}>
        {context.slots.default?.()}
      </div>
    );
  }
});