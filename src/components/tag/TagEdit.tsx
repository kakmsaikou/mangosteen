import {computed, defineComponent, ref} from 'vue';

export const TagEdit = defineComponent({
  setup: () => {
    const arr = [1, 2, 3, 4, 5];
    const refNum = ref(0);
    const onClick = () => {
      if (refNum.value < 4) refNum.value += 1;
    };
    const num = computed(() => { // 这个 num 可以定义在 return 外
      return arr[refNum.value];
    });
    return () => <>
      <div>{num.value}</div>
      <button onClick={onClick}>refNum+1</button>
    </>;
  }
});