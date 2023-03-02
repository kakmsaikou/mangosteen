import { defineComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { TagFrom } from './TagForm';
import s from './TagEdit.module.scss';
import { BackIcon } from '../../shared/BackIcon';
import { useRoute } from 'vue-router';

export const TagEdit = defineComponent({
  setup: () => {
    const route = useRoute();
    const numberId = parseInt(route.params.id!.toString());
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>;
    }
    return () => (
      <MainLayout class={s.wrapper}>
        {{
          title: () => '标签详情',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagFrom id={numberId} />
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
