import { ref } from 'vue';

export const useBoolean = (initialValue: boolean) => {
  const bool = ref(initialValue);
  return {
    ref: bool,
    toggle: () => (bool.value = !bool.value),
    on: () => (bool.value = true),
    off: () => (bool.value = false),
  };
};
