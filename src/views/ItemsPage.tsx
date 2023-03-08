import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export const ItemsPage = defineComponent({
  setup: () => {
    return () => <RouterView />;
  },
});

export default ItemsPage;