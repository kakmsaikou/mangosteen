import { defineComponent, PropType, ref, computed, onMounted } from 'vue';
import { FormItem } from '../../shared/Form';
import { http } from '../../shared/Http';
import s from './Charts.module.scss';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { TransactionList } from './TransactionList';

type Data1Item = { happen_at: string; amount: number };
type Data1 = Data1Item[];

export const Charts = defineComponent({
  props: {
    startDate: String as PropType<string>,
    endDate: String as PropType<string>,
  },
  setup: props => {
    const kind = ref('expenses');
    const data1 = ref<Data1>([]);
    const betterData1 = computed(() =>
      data1.value.map(
        item => [item.happen_at, item.amount] as [string, number]
      )
    );

    onMounted(async () => {
      const response = await http.get<{ groups: Data1; summary: number }>(
        '/items/summary',
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          kind: kind.value,
          _mock: 'itemSummary',
        }
      );
      console.log('response.data');
      console.log(response.data);
      data1.value = response.data.groups;
    });

    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' },
          ]}
          v-model={kind.value}
        />
        <LineChart data={betterData1.value} />
        <PieChart />
        <TransactionList />
      </div>
    );
  },
});
