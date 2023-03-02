import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../shared/Icon';
import { Time } from '../../shared/time';
import s from './InputPad.module.scss';
import { DatetimePicker, Popup } from 'vant';

export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    onSubmit: Function as PropType<() => void>,
  },
  setup: (props, context) => {
    const refAmount = ref(
      props.amount ? (props.amount / 100).toString() : '0'
    );
    const appendText = (n: number | string) => {
      const nString = n.toString();
      const dotIndex = refAmount.value.indexOf('.');
      if (refAmount.value.length >= 13) return;
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) return;
      if (nString === '.') {
        if (dotIndex >= 0) return;
      } else if (nString === '0') {
        if (refAmount.value === '0') return;
      } else {
        if (refAmount.value === '0') refAmount.value = '';
      }
      refAmount.value += n.toString();
    };

    const createTextObject = (text: string | number) => ({
      text: String(text),
      onClick: () => {
        appendText(text);
      },
    });
    // 数字键的顺序为 1~9、'.'、0
    const numArr = Array.from({ length: 9 }, (_, i) =>
      createTextObject(i + 1)
    ).concat([createTextObject('.'), createTextObject(0)]);
    const buttons = [
      ...numArr,
      {
        text: '清空',
        onClick: () => {
          refAmount.value = '0';
        },
      },
      {
        text: '提交',
        onClick: () => {
          context.emit('update:amount', parseFloat(refAmount.value) * 100);
          props.onSubmit?.();
        },
      },
    ];
    
    const refIsDatetimePickerVisible = ref(false);
    const showDatetimePicker = () =>
      (refIsDatetimePickerVisible.value = true);
    const hideDatetimePicker = () =>
      (refIsDatetimePickerVisible.value = false);

    const setDate = (date: Date) => {
      context.emit('update:happenAt', date.toISOString());
      hideDatetimePicker();
    };

    return () => (
      <>
        <div class={s.dateAmountContainer}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>
              <span onClick={showDatetimePicker}>
                {new Time(props.happenAt).format()}
              </span>
              <Popup
                position="bottom"
                v-model:show={refIsDatetimePickerVisible.value}
              >
                <DatetimePicker
                  value={props.happenAt}
                  type="date"
                  title="选择年月日"
                  onConfirm={setDate}
                  onCancel={hideDatetimePicker}
                />
              </Popup>
            </span>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map(button => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </>
    );
  },
});
