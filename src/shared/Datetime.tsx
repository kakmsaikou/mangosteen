import { computed, defineComponent, PropType } from 'vue';
import { Time } from './time';

export const Datetime = defineComponent({
  props: {
    value: {
      type: [Date, String] as PropType<Date | string>,
      required: true,
    },
    format: { type: String, default: 'YYYY-MM-DD HH:mm:ss' },
  },
  setup: props => {
    const formattedDatetime = computed(() => {
      return new Time(props.value).format(props.format);
    });
    
    return () => <>{formattedDatetime.value}</>;
  },
});
