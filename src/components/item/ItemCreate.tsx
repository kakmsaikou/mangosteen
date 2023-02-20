import {defineComponent, ref} from 'vue';
import s from './ItemCreate.module.scss'
import {Icon} from '../../shared/Icon';
import {MainLayout} from '../../layouts/MainLayout';
import {Tabs, Tab} from '../../shared/Tabs';

export const ItemCreate = defineComponent({
  setup: ()=>{
    const refSelectedType = ref('支出')
    return ()=>(
      <MainLayout>{{
          title: ()=> '记一笔',
          icon: ()=> <Icon name='left' class={s.navIcon} />,
          default: ()=><>
            <Tabs selected={refSelectedType.value}
                  onUpdateSelected={(type)=>{refSelectedType.value = type}}>
              <Tab name='支出'>
                icon 列表
              </Tab>
              <Tab name='收入'>
                icon 列表2
              </Tab>
            </Tabs>
          </>
        }}</MainLayout>
    )
  }
})