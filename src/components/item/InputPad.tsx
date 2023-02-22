import {defineComponent, ref} from 'vue';
import {Icon} from '../../shared/Icon';
import {time} from '../../shared/time';
import s from './InputPad.module.scss';
import {DatetimePicker, Popup} from 'vant';

export const InputPad = defineComponent({
  setup: () => {
    const now = new Date();
    const refDate = ref<Date>(now);
    const refAmount = ref('0');
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
    const buttons = [
      {text: '1', onClick: () => {appendText(1);},},
      {text: '2', onClick: () => {appendText(2);},},
      {text: '3', onClick: () => {appendText(3);},},
      {text: '4', onClick: () => {appendText(4);},},
      {text: '5', onClick: () => {appendText(5);},},
      {text: '6', onClick: () => {appendText(6);},},
      {text: '7', onClick: () => {appendText(7);},},
      {text: '8', onClick: () => {appendText(8);},},
      {text: '9', onClick: () => {appendText(9);},},
      {text: '.', onClick: () => {appendText('.');},},
      {text: '0', onClick: () => {appendText(0);},},
      {text: '清空', onClick: () => {refAmount.value = '0';},},
      {text: '提交', onClick: () => {}},
    ];
    const refIsDatetimePickerVisible = ref(false);
    const showDatetimePicker = () => (refIsDatetimePickerVisible.value = true);
    const hideDatetimePicker = () => (refIsDatetimePickerVisible.value = false);
    const setDate = (date: Date) => {
      refDate.value = date;
      hideDatetimePicker();
    };

    return () => (
      <>
        <div class={s.dateAmountContainer}>
          <span class={s.date}>
            <Icon name="date" class={s.icon}/>
            <span>
              <span onClick={showDatetimePicker}>
                {time(refDate.value).format()}
              </span>
              <Popup
                position="bottom"
                v-model:show={refIsDatetimePickerVisible.value}
              >
                <DatetimePicker
                  value={refDate.value}
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
          {buttons.map((button) => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </>
    );
  },
});
