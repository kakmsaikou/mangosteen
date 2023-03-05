import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { http } from '../../shared/Http';
import { myHandleError } from '../../shared/myHandleError';
import { Tabs, Tab } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';

export const ItemCreate = defineComponent({
  setup: () => {
    const formData = reactive({
      kind: '支出',
      tag_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    });
    const router = useRouter();

    const onSubmit = async () => {
      await http
        .post<Resource<Item>>('/items', formData, { _mock: 'itemCreate' , _autoLoading: true})
        .catch(error => {
          myHandleError(error);
        });
      router.push('/items');
    };

    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon />,
          default: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind} class={s.tabs}>
                <Tab name='支出'>
                  <Tags
                    kind='expenses'
                    v-model:selected={formData.tag_id[0]}
                  />
                </Tab>
                <Tab name='收入'>
                  <Tags kind='income' v-model:selected={formData.tag_id[0]} />
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad
                  v-model:happenAt={formData.happen_at}
                  v-model:amount={formData.amount}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
