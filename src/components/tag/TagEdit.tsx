import { defineComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { TagFrom } from './TagForm';
import s from './TagEdit.module.scss';
import { BackIcon } from '../../shared/BackIcon';
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { Dialog } from 'vant';
import { myHandleError } from '../../shared/myHandleError';

export const TagEdit = defineComponent({
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const numberId = parseInt(route.params.id!.toString());
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>;
    }
    const onDelete = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要删除吗？',
      });
      await http
        .delete(
          `/tags/${numberId}`,
          {
            withItems: options?.withItems ? 'true' : 'false',
          },
          { _autoLoading: true }
        )
        .catch(myHandleError);
      router.back();
    };
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
                  onClick={() => {
                    onDelete();
                  }}
                  level={'danger'}
                >
                  删除标签
                </Button>
                <Button
                  class={s.clearAllRecord}
                  onClick={() => {
                    onDelete({ withItems: true });
                  }}
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
