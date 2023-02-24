import { Button } from '../../shared/Button';
import { defineComponent, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { Icon } from '../../shared/Icon';

export const TagEdit = defineComponent({
  setup: () => {
    const reactiveFormData = reactive({
      name: '',
      sign: '😀',
    });
    const reactiveErrors = reactive<{ [k in keyof typeof reactiveFormData]?: string[] }>({});
    const omSubmit = (e: Event) => {
      const rules: Rules<typeof reactiveFormData> = [
        { key: 'name', type: 'required', message: '必填' },
        {
          key: 'name',
          type: 'pattern',
          regex: /^.{1,4}$/,
          message: '只能填 1 到 4 个字符',
        },
        { key: 'sign', type: 'required', message: '必填' },
      ];
      Object.assign(reactiveErrors, {
        name: undefined,
        sign: undefined,
      });
      Object.assign(reactiveErrors, validate(reactiveFormData, rules));
      e.preventDefault();
    };
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: () => <Icon name="left" onClick={() => {}} />,
          default: () => (
            <form class={s.form} onSubmit={omSubmit}>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>标签名</span>
                  <div class={s.formItem_value}>
                    <input v-model={reactiveFormData.name} class={[s.formItem, s.input, s.error]}></input>
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>{reactiveErrors['name'] ? reactiveErrors['name'][0] : '　'}</span>
                  </div>
                </label>
              </div>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>符号 {reactiveFormData.sign}</span>
                  <div class={s.formItem_value}>
                    <EmojiSelect v-model={reactiveFormData.sign} class={[s.formItem, s.emojiList, s.error]} />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>{reactiveErrors['sign'] ? reactiveErrors['sign']?.[0] : '　'}</span>
                  </div>
                </label>
              </div>
              <p class={s.tips}>记账时长按标签即可进行编辑</p>
              <div class={s.formRow}>
                <div class={s.formItem_value}>
                  <Button class={[s.formItem, s.button]}>确定</Button>
                </div>
              </div>
            </form>
          ),
        }}
      </MainLayout>
    );
  },
});
