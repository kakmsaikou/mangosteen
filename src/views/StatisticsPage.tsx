import { defineComponent } from 'vue';
import { Charts } from '../components/statistics/Charts';
import { TimeTabsLayout } from '../layouts/TimeTabsLayout';

export const StatisticsPage = defineComponent({
  setup: () => {
    return () => (
      <TimeTabsLayout
        rerenderOnSwitchTab={true}
        component={Charts}
        hideThisYear={true}
      />
    );
  },
});
