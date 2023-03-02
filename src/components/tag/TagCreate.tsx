import { defineComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { TagFrom } from './TagForm';

export const TagCreate = defineComponent({
  setup: () => {
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: () => <BackIcon/>,
          default: () => <TagFrom />,
        }}
      </MainLayout>
    );
  },
});
