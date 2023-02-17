import {defineComponent} from 'vue';
import s from './ItemCreate.module.scss'
import {Icon} from '../../shared/Icon';
import {MainLayout} from '../../layouts/MainLayout';

export const ItemCreate = defineComponent({
  setup: ()=>{
    return ()=>(
      <MainLayout>{{
          title: ()=> '记一笔',
          icon: ()=> <Icon name='left' class={s.navIcon} />,
          default: ()=><>
            main
          </>
        }}</MainLayout>
    )
  }
})