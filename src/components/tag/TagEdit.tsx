import { defineComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { TagFrom } from './TagForm';
import s from './TagEdit.module.scss';
import { BackIcon } from '../../shared/BackIcon';

export const TagEdit = defineComponent({
  setup: () => {
    return () => (
      <MainLayout class={s.wrapper}>
        {{
          title: () => '标签详情',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagFrom />
              <div class={s.actions}>
                <Button
                  class={s.deleteTag}
                  onClick={() => {}}
                  level={'danger'}
                >
                  删除标签
                </Button>
                <Button
                  class={s.clearAllRecord}
                  onClick={() => {}}
                  level={'danger'}
                >
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
