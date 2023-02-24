import { defineComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { TagFrom } from './TagForm';

export const TagCreate = defineComponent({
  setup: () => {
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: () => <Icon name="left" onClick={() => {}} />,
          default: () => <TagFrom />,
        }}
      </MainLayout>
    );
  },
});
