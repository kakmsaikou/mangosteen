import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { http } from '../../shared/Http';
import { myHandleError, popupDialog } from '../../shared/myHandleError';
import { Tabs, Tab } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';
import { hasError, validate } from '../../shared/validate';
import { Dialog } from 'vant';

export const ItemCreate = defineComponent({
  setup: () => {
    const formData = reactive<Partial<Item>>({
      kind: 'expenses',
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    });
    const errors = reactive<FormErrors<typeof formData>>({
      kind: [],
      tag_ids: [],
      amount: [],
      happen_at: [],
    });
    const router = useRouter();

    const onSubmit = async () => {
      Object.assign(errors, {
        kind: [],
        tag_ids: [],
        amount: [],
        happen_at: [],
      });
      Object.assign(
        errors,
        validate(formData, [
          { key: 'kind', type: 'required', message: '收入/支出类别不能为空' },
          { key: 'tag_ids', type: 'required', message: '标签不能为空' },
          { key: 'amount', type: 'required', message: '金额不能为空' },
          {
            key: 'amount',
            type: 'notEqual',
            value: 0,
            message: '金额必须大于0',
          },
          { key: 'happen_at', type: 'required', message: '时间不能为空' },
        ])
      );
      if (hasError(errors)) {
        Dialog.alert({
          title: '出错',
          message: Object.values(errors).filter(i=>i.length > 0).join('\n'),
        });
        return;
      }
      await http
        .post<Resource<Item>>('/items', formData, {
          _mock: 'itemCreate',
          _autoLoading: true,
        })
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
                <Tab value='expenses' name='支出'>
                  <Tags
                    kind='expenses'
                    v-model:selected={formData.tag_ids![0]}
                  />
                </Tab>
                <Tab value='income' name='收入'>
                  <Tags
                    kind='income'
                    v-model:selected={formData.tag_ids![0]}
                  />
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
