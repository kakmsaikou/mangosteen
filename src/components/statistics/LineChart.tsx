import * as echarts from 'echarts';
import { defineComponent, onMounted, ref } from 'vue';
import s from './LineChart.module.scss';

export const LineChart = defineComponent({
  setup: () => {
    const refChartContainer = ref<HTMLDivElement>();
    onMounted(() => {
      if (refChartContainer.value === undefined) return;
      const myChart = echarts.init(refChartContainer.value);
      myChart.setOption({
        grid: [
          {
            left: 0,
            top: 0,
            right: 0,
            button: 20,
          },
        ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
      });
    });
    return () => <div class={s.chartContainer} ref={refChartContainer} />;
  },
});
