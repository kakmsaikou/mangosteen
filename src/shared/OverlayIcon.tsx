
import { defineComponent, ref } from "vue";
import { Icon } from "./Icon";
import { Overlay } from "./Overlay";
import s from  './OverlayIcon.module.scss'

export const OverlayIcon = defineComponent({
    setup: () => {
      const refOverlayVisible = ref(false);
      const onClickMenu = () => {
        refOverlayVisible.value = !refOverlayVisible.value;
      };
      const onClose = () => {
        refOverlayVisible.value = false;
      };
      return () => (
        <>
          <Icon class={s.navIcon} onClick={onClickMenu} name="menu" />
          {refOverlayVisible.value && <Overlay onClose={onClose} />}
        </>
      );
    },
  });
  