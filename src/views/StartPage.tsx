import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import { FloatButton } from "../shared/FloatButton";
import { Center } from "../shared/Center";
import { Icon } from "../shared/Icon";
import s from "./StartPage.module.scss";
import { Overlay } from "../shared/Overlay";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";

export const StartPage = defineComponent({
  setup: () => {
    const refOverlayVisible = ref(false);
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value;
    };
    const onClose = () => {
      refOverlayVisible.value = false;
    };
    return () => (
      <MainLayout>
        {{
          title: () => "山竹记账",
          icon: () => (
            <Icon class={s.navIcon} onClick={onClickMenu} name="menu" />
          ),
          default: () => (
            <>
              <Center class={s.piggy_wrapper}>
                <Icon class={s.piggy} name="piggy" />
              </Center>
              <div class={s.button_wrapper}>
                <Button class={s.button}>
                  <RouterLink to="/items/create">开始记账</RouterLink>
                </Button>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add" />
              </RouterLink>
              {refOverlayVisible.value && <Overlay onClose={onClose} />}
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
