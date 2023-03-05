import { Button } from '../../shared/Button';
import { defineComponent, onMounted, reactive } from 'vue';
import { hasError, Rules } from '../../shared/validate';
import s from './Tag.module.scss';
import { Form, FormItem } from '../../shared/Form';
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { myHandleError } from '../../shared/myHandleError';

export const TagFrom = defineComponent({
  props: {
    id: Number,
  },
  setup: props => {
    const route = useRoute();
    const router = useRouter();
    if (!route.query.kind) {
      return () => <div>参数错误</div>;
    }
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      name: '',
      sign: '😀',
      kind: route.query.kind,
    });
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const onSubmit = async (e: Event) => {
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        {
          key: 'name',
          type: 'pattern',
          regex: /^.{1,4}$/,
          message: '只能填 1 到 4 个字符',
        },
        { key: 'sign', type: 'required', message: '必填' },
      ];
      Object.assign(errors, {
        name: [],
        sign: [],
      });
      // Object.assign(errors, validate(formData, rules));
      if (!hasError(errors)) {
        const promise = (await formData.id)
          ? http.patch(`/tags/${formData.id}`, formData, {
              _mock: 'tagEdit',
              _autoLoading: true,
            })
          : http.post('/tags', formData, {
              _mock: 'tagCreate',
              _autoLoading: true,
            });
        promise.catch(error => {
          myHandleError(error, data => {
            Object.assign(error, data.errors);
          });
        });
        router.back();
      }
    };
    onMounted(async () => {
      if (!props.id) {
        return;
      }
      const response = await http.get<Resource<Tag>>(
        `/tags/${props.id}`,
        {},
        { _mock: 'tagShow' }
      );
      Object.assign(formData, await response.data.resource);
    });
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label='标签名(4个字符以内)'
          type='text'
          v-model={formData.name}
          error={errors['name']?.[0]}
        />
        <FormItem
          label={'符号' + formData.sign}
          type='emojiSelect'
          v-model={formData.sign}
          error={errors['sign']?.[0]}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button type='submit' class={[s.button]}>
            确定
          </Button>
        </FormItem>
      </Form>
    );
  },
});
