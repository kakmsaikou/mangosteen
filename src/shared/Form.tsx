import { number } from 'echarts';
import { DatetimePicker, Popup } from 'vant';
import { computed, defineComponent, PropType, ref } from 'vue';
import { Button } from './Button';
import { EmojiSelect } from './EmojiSelect';
import s from './Form.module.scss';
import { Time } from './time';

export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    );
  },
});

export const FormItem = defineComponent({
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'verificationCode' | 'select'>,
    },
    error: {
      type: String,
    },
    placeholder: String,
    options: Array as PropType<Array<{ value: string; text: string }>>,
    onClick: Function as PropType<() => void>,
    countForm: {
      type: Number,
      default: 60,
    },
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const timer = ref<number>();
    const count = ref<number>(props.countForm);
    const isCounting = computed(() => !!timer.value);
    const onClickSendVerificationCode = () => {
      props.onClick?.();
      timer.value = setInterval(()=>{
        count.value -= 1
        if(count.value === 0) {
          clearInterval(timer.value)
          timer.value = undefined
          count.value = props.countForm
        }
      }, 1000)
    };
    const refDateVisible = ref(false);
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return (
            <input
              class={[s.formItem, s.input]}
              placeholder={props.placeholder}
              value={props.modelValue}
              onInput={e => context.emit('update:modelValue', (e.target as HTMLInputElement).value)}
            />
          );
        case 'emojiSelect':
          return (
            <EmojiSelect
              modelValue={props.modelValue?.toString()}
              onUpdateModelValue={value => context.emit('update:modelValue', value)}
              class={[s.formItem, s.emojiList, s.error]}
            />
          );
        case 'verificationCode':
          return (
            <>
              <input
                class={[s.formItem, s.input, s.verificationCodeInput]}
                placeholder={props.placeholder}
                onInput={e =>
                  context.emit('update:modelValue', (e.target as HTMLInputElement).value)
                }
              />
              <Button disabled={isCounting.value} onClick={onClickSendVerificationCode}>
                {isCounting.value ? `${count.value}秒后可重新发送` : '发送验证码'}
              </Button>
            </>
          );

        case 'select':
          return (
            <select
              class={[s.formItem, s.select]}
              value={props.modelValue}
              onChange={e => {
                context.emit('update:modelValue', (e.target as HTMLInputElement).value);
              }}
            >
              {props.options?.map(option => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
          );
        case 'date':
          return (
            <>
              <input
                class={[s.formItem, s.input]}
                placeholder={props.placeholder}
                readonly={true}
                value={props.modelValue}
                onClick={() => {
                  refDateVisible.value = true;
                }}
              />
              <Popup position="bottom" v-model:show={refDateVisible.value}>
                <DatetimePicker
                  value={props.modelValue}
                  type="date"
                  title="选择年月日"
                  onConfirm={(date: Date) => {
                    context.emit('update:modelValue', new Time(date).format());
                    refDateVisible.value = false;
                  }}
                  onCancel={() => (refDateVisible.value = false)}
                />
              </Popup>
            </>
          );
        case undefined:
          return context.slots.default?.();
      }
    });
    return () => (
      <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label && <span class={s.formItem_name}>{props.label}</span>}
          <div class={s.formItem_value}>{content.value}</div>
          <div class={s.formItem_errorHint}>
            <span>{props.error ?? '　'}</span>
          </div>
        </label>
      </div>
    );
  },
});
