import { defineComponent, reactive, ref } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { Icon } from '../shared/Icon';
import { validate, hasError } from '../shared/validate';
import s from './SignInPage.module.scss';
import { http } from '../shared/Http';
import { useBoolean } from '../hooks/useBoolean';
import { useRoute, useRouter } from 'vue-router';
import { BackIcon } from '../shared/BackIcon';
import { useMeStore } from '../stores/useMeStore';

export const SignInPage = defineComponent({
  setup: () => {
    const meStore = useMeStore()
    const formData = reactive({
      email: 'youjosaikou@qq.com',
      code: '',
    });
    const reactiveErrors = reactive({
      email: [],
      code: [],
    });
    const refVerificationCode = ref<any>('');
    const {
      ref: refDisable,
      toggle,
      on: disabled,
      off: enabled,
    } = useBoolean(false);
    const router = useRouter();
    const route = useRoute();
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      Object.assign(
        reactiveErrors,
        {
          email: [],
          code: '',
        },
        validate(formData, [
          { key: 'email', type: 'required', message: '必填' },
          {
            key: 'email',
            type: 'pattern',
            regex: /.+@.+/,
            message: '必须是邮箱地址',
          },
          { key: 'code', type: 'required', message: '必填' },
        ])
      );
      if (!hasError(reactiveErrors)) {
        const response = await http
          .post<{ jwt: string }>('/session', formData)
          .catch(onError);
        localStorage.setItem('jwt', response.data.jwt);
        const returnTo = route.query.return_to?.toString();
        meStore.refreshMe();
        router.push(returnTo || '/');
      }
    };
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(reactiveErrors, error.response.data.errors);
      }
      throw error;
    };
    const onClickSendVerificationCode = async () => {
      disabled();
      await http
        .post(
          '/validation_codes',
          { email: formData.email },
          {
            _autoLoading: true,
          }
        )
        .catch(onError)
        .finally(enabled);
      refVerificationCode.value.startCountDown();
    };
    return () => (
      <MainLayout>
        {{
          title: () => '登陆',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={s.logo}>
                <Icon class={s.icon} name='mangosteen' />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label='邮箱地址'
                  type='text'
                  v-model={formData.email}
                  error={reactiveErrors.email?.[0]}
                  placeholder='请输入邮箱，然后点击发送验证码'
                />
                <FormItem
                  ref={refVerificationCode}
                  onClick={onClickSendVerificationCode}
                  label='验证码'
                  type='verificationCode'
                  v-model={formData.code}
                  error={reactiveErrors.code?.[0]}
                  placeholder='请输入六位数字'
                  disabled={refDisable.value}
                  countForm={30}
                />
                <FormItem class={s.loginInBtn}>
                  <Button type='submit'>登陆</Button>
                </FormItem>
              </Form>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

export default SignInPage;