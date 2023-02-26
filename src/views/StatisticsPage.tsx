import { defineComponent } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Icon } from '../shared/Icon';
import { Tab, Tabs } from '../shared/Tabs';
import s from './StatisticsPage.module.scss';

export const StatisticsPage = defineComponent({
  setup: () => {
    return () => <MainLayout>
      {{
        title: ()=>'统计图表',
        icon: ()=><Icon name='left'/>,
        default: ()=> <div class={s.wrapper}>
          <Tabs classPrefix='customTabs'>
            <Tab name='本月'></Tab>
            <Tab name='上月'></Tab>
            <Tab name='今年'></Tab>
            <Tab name='自定义时间'></Tab>
          </Tabs>
        </div>
      }}
    </MainLayout>
  },
});