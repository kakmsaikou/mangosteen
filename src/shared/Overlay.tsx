import { Dialog } from 'vant';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useMeStore } from '../stores/useMeStore';
import { Icon } from './Icon';
import s from './Overlay.module.scss';

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup: props => {
    const meStore = useMeStore();
    const closeMenu = () => {
      props.onClose?.();
    };
    const currentPath = useRoute().fullPath;
    const LoggedStatus = ref<User>();
    onMounted(async () => {
      const response = await meStore.mePromise;
      LoggedStatus.value = response?.data.resource;
    });
    const handleLogout = () => {
      Dialog.confirm({
        title: '确认',
        message: '确认要退出登录吗？',
      }).then(() => {
        localStorage.removeItem('jwt');
        window.location.reload();
      });
    };
    return () => (
      <>
        <div class={s.mask} onClick={closeMenu}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {LoggedStatus.value ? (
              <span>
                <h2 class={s.email}>{LoggedStatus.value?.email}</h2>
                <p onClick={handleLogout}>点击这里退出登录</p>
              </span>
            ) : (
              <RouterLink to={`/sign_in?return_to=${currentPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登陆</p>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to='/items' class={s.action}>
                  <Icon name='piggy' class={s.icon} />
                  <span>首页</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to='/statistics' class={s.action}>
                  <Icon name='charts' class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to='/export' class={s.action}>
                  <Icon name='export' class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to='/notify' class={s.action}>
                  <Icon name='notify' class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});
