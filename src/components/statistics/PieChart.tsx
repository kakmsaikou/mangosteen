import { defineComponent, onMounted, ref } from 'vue';
import s from './PieChart.module.scss';
import * as echarts from 'echarts';

export const PieChart = defineComponent({
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
            button: 0,
          },
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    });
    return () => <div class={s.chartContainer} ref={refChartContainer} />;
  },
});
