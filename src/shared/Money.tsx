import { computed, defineComponent } from 'vue';

export const Money = defineComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  setup: props => {
    const formattedAccount = computed(() => {
        const nString = (props.value / 100).toString();
        const dotIndex = nString.indexOf('.');
        if (dotIndex < 0) {
            return nString + '.00';
        } else if (nString.substring(dotIndex).length === 2) {
            return nString + '0';
        } else {
            return nString;
        }
    })

    return () => <>{formattedAccount.value}</>;
  },
});
