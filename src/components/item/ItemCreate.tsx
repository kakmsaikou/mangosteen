import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { Tabs, Tab } from '../../shared/Tabs';
import { useTags } from '../../shared/useTags';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: () => {
    const refKind = ref('支出');
    const {
      tags: expensesTags,
      hasMore: HasMoreExpensesTag,
      fetchTags: fetchExpensesTags,
    } = useTags(page => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        page: page + 1,
        _mock: 'tagIndex',
      });
    });
    const {
      tags: incomeTags,
      hasMore: HasMoreIncomeTag,
      fetchTags: fetchIncomeTags,
    } = useTags(page => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'income',
        page: page + 1,
        _mock: 'tagIndex',
      });
    });
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <div class={s.wrapper}>
              <Tabs
                v-model:selected={refKind.value}
                onUpdate:selected={() => {
                  console.log(11);
                }}
                class={s.tabs}
              >
                <Tab name="支出">
                  <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {expensesTags.value.map(tag => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </div>
                  <div class={s.loadMore_wrapper}>
                    {HasMoreExpensesTag.value ? (
                      <Button class={s.loadMore} onClick={fetchExpensesTags}>
                        加载更多
                      </Button>
                    ) : (
                      <span class={s.noMore}>没有更多</span>
                    )}
                  </div>
                </Tab>
                <Tab name="收入">
                  <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {incomeTags.value.map(tag => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </div>
                  <div class={s.loadMore_wrapper}>
                    {HasMoreIncomeTag.value ? (
                      <Button class={s.loadMore} onClick={fetchIncomeTags}>
                        加载更多
                      </Button>
                    ) : (
                      <span class={s.noMore}>没有更多</span>
                    )}
                  </div>
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
