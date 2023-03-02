import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import s from './BackIcon.module.scss';
import { Icon } from './Icon';

export const BackIcon = defineComponent({
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const onClick = () => {
      const { return_to } = route.query;
      if (return_to) {
        router.push(return_to.toString());
      } else {
        router.back();
      }
    };
    return () => <Icon name="left" class={s.navIcon} onClick={onClick} />;
  },
});
