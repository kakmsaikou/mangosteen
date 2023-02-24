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
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
    ]);
    reactiveExpensesTags.forEach(tag => {
      console.log(tag.name);
    });
    const reactiveIncomeTags = reactive([
      { id: 4, name: '工资', sign: '￥', category: 'income' },
      { id: 5, name: '彩票', sign: '￥', category: 'income' },
      { id: 6, name: '滴滴', sign: '￥', category: 'income' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
    ]);
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name="支出" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>新增</div>
                  </div>
                  {reactiveExpensesTags.map(tag => (
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>{tag.sign}</div>
                      <div class={s.name}>{tag.name}</div>
                    </div>
                  ))}
                </Tab>
                <Tab name="收入" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>新增</div>
                  </div>
                  {reactiveIncomeTags.map(tag => (
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>{tag.sign}</div>
                      <div class={s.name}>{tag.name}</div>
                    </div>
                  ))}
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
