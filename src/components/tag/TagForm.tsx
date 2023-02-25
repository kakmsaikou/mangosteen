import { Button } from '../../shared/Button';
import { defineComponent, reactive } from 'vue';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { Form, FormItem } from '../../shared/Form';

export const TagFrom = defineComponent({
  setup: () => {
    const reactiveFormData = reactive({
      name: '',
      sign: '😀',
    });
    const reactiveErrors = reactive<{ [k in keyof typeof reactiveFormData]?: string[] }>({});
    const onSubmit = (e: Event) => {
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
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名"
          type="text"
          v-model={reactiveFormData.name}
          error={reactiveErrors['name'] ? reactiveErrors['name'][0] : '　'}
        />
        <FormItem
          label={'符号' + reactiveFormData.sign}
          type="emojiSelect"
          v-model={reactiveFormData.sign}
          error={reactiveErrors['sign'] ? reactiveErrors['sign'][0] : '　'}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button class={[s.button]}>确定</Button>
        </FormItem>
      </Form>
    );
  },
});
