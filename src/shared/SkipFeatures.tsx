import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export const SkipFeatures = defineComponent({
  props: {
    to: { type: String, default: '/start' },
  },
  setup: (props, context) => {
    const onClick = () => {
      localStorage.setItem('skipFeatures', 'yes');
    };
    return () => (
      <span onClick={onClick}>
        <RouterLink to={props.to}>{context.slots.default?.()}</RouterLink>
      </span>
    );
  },
});
