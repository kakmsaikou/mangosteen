import * as echarts from 'echarts';
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './LineChart.module.scss';
import { Time } from '../../shared/time';
import { getFormattedAccount } from '../../shared/Money';

const echartsOption = {
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: ([item]: any) => {
      const [x, y] = item.data;
      return `${new Time(new Date(x)).format(
        'YYYY年MM月DD日'
      )} ￥${getFormattedAccount(y)}`;
    },
  },
  grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
  xAxis: {
    type: 'time',
    boundaryGap: ['3%', '0%'],
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).format('MM-DD'),
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    show: true,
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
    axisLabel: {
      show: false,
    },
  },
};

export const LineChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<[string, number][]>,
      required: true,
    },
  },
  setup: props => {
    const refChartContainer = ref<HTMLDivElement>();
    const refChart = ref<echarts.ECharts>();
    onMounted(() => {
      if (refChartContainer.value === undefined) return;
      refChart.value = echarts.init(refChartContainer.value);
      refChart.value.setOption({
        ...echartsOption,
        series: [
          {
            data: props.data,
            type: 'line',
          },
        ],
      });
    });
    watch(
      () => props.data,
      () => {
        refChart.value?.setOption({
          series: [
            {
              data: props.data,
            },
          ],
        });
      }
    );
    return () => <div class={s.chartContainer} ref={refChartContainer} />;
  },
});
