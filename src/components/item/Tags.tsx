import { number } from 'echarts';
import { defineComponent, onUpdated, PropType } from 'vue';
import { Button } from '../../shared/Button';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { useTags } from '../../shared/useTags';
import s from './Tags.module.scss';

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<'expenses' | 'income'>,
      required: true,
    },
    selected: Number,
  },
  setup: (props, context) => {
    const {
      tags: tags,
      hasMore: hasMore,
      fetchTags: fetch,
    } = useTags(page => {
      return http.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        page: page + 1,
        _mock: 'tagIndex',
      });
    });
    const onSelect = (tagId: Number) => {
      context.emit('update:selected', tagId);
    };
    return () => (
      <>
        <div class={s.tags_wrapper}>
          <div class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </div>
          {tags.value.map(tag => (
            <div
              class={[s.tag, props.selected === tag.id ? s.selected : '']}
              onClick={() => {
                onSelect(tag.id);
              }}
            >
              <div class={s.sign}>{tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={s.loadMore_wrapper}>
          {hasMore.value ? (
            <Button class={s.loadMore} onClick={fetch}>
              加载更多
            </Button>
          ) : (
            <span class={s.noMore}>没有更多</span>
          )}
        </div>
      </>
    );
  },
});
