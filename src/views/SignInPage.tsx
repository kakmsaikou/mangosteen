import { defineComponent, reactive } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { Icon } from '../shared/Icon';
import { validate } from '../shared/validate';
import s from './SignInPage.module.scss';
import axios from 'axios';

export const SignInPage = defineComponent({
  setup: () => {
    const formData = reactive({
      email: '',
      code: '',
    });
    const reactiveErrors = reactive({
      email: [],
      code: [],
    });
    const onSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(
        reactiveErrors,
        {
          email: [],
          code: '',
        },
        validate(formData, [
          { key: 'email', type: 'required', message: '必填' },
          { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
          { key: 'code', type: 'required', message: '必填' },
        ])
      );
    };
    const onClickSendVerificationCode = async () => {
      // const response = await axios.post('/api/v1/validation_codes', { email: formData.email });
      // console.log(response)
    };
    return () => (
      <MainLayout>
        {{
          title: () => '登陆',
          icon: () => <Icon name="left" />,
          default: () => (
            <>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  v-model={formData.email}
                  error={reactiveErrors.email?.[0]}
                  placeholder="请输入邮箱，然后点击发送验证码"
                />
                <FormItem
                  onClick={onClickSendVerificationCode}
                  label="验证码"
                  type="verificationCode"
                  v-model={formData.code}
                  error={reactiveErrors.code?.[0]}
                  placeholder="请输入六位数字"
                  countForm={30}
                />
                <FormItem class={s.loginInBtn}>
                  <Button>登陆</Button>
                </FormItem>
              </Form>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
