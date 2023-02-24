import { defineComponent, reactive, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { Icon } from '../../shared/Icon';
import { MainLayout } from '../../layouts/MainLayout';
import { Tabs, Tab } from '../../shared/Tabs';
import { InputPad } from './InputPad';

export const ItemCreate = defineComponent({
  setup: () => {
    const refKind = ref('支出');
    const reactiveExpensesTags = reactive([
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
    ]);
    reactiveExpensesTags.forEach(tag => {
      console.log(tag.name);
    });
    const reactiveIncomeTags = reactive([
      { id: 4, name: '工资', sign: '￥', category: 'income' },
      { id: 5, name: '彩票', sign: '￥', category: 'income' },
      { id: 6, name: '滴滴', sign: '￥', category: 'income' },
    ]);
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <>
              <Tabs v-model:selected={refKind.value}>
                <Tab name="支出">
                  {reactiveExpensesTags.map(tag => (
                    <span>{tag.name}</span>
                  ))}
                </Tab>
                <Tab name="收入">
                  {reactiveIncomeTags.map(tag => (
                    <span>{tag.name}</span>
                  ))}
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
