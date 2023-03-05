import { defineComponent, PropType } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
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
    const router = useRouter();

    const {
      tags: tags,
      hasMore: hasMore,
      fetchTags: fetch,
    } = useTags(page => {
      return http.get<Resources<Tag>>(
        '/tags',
        {
          kind: props.kind,
          page: page + 1,
        },
        { _mock: 'tagIndex', _autoLoading: true }
      );
    });
    const onSelect = (tagId: Number) => {
      context.emit('update:selected', tagId);
    };
    const isSelectedTag = (tag: Tag) => {
      return props.selected === tag.id ? s.selected : '';
    };

    let timer: number | undefined = undefined;
    let currentTag: HTMLDivElement | undefined = undefined;
    const onLongPress = (tagId: number) => {
      const { fullPath } = router.currentRoute.value;
      router.push(
        `/tags/${tagId}/edit?kind=${props.kind}&return_to${fullPath}`
      );
    };
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag = e.currentTarget as HTMLDivElement;
      timer = setTimeout(() => {
        onLongPress(tag.id);
      }, 500);
    };
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer);
    };
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientX
      );
      if (
        currentTag !== pointedElement &&
        !currentTag?.contains(pointedElement)
      ) {
        clearTimeout(timer);
      }
    };

    return () => (
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
          <RouterLink to={`/tags/create?kind=${props.kind}`}>
            <div class={s.tag}>
              <div class={s.sign}>
                <Icon name='add' class={s.createTag} />
              </div>
              <div class={s.name}>新增</div>
            </div>
          </RouterLink>
          {tags.value.map(tag => (
            <div
              class={[s.tag, isSelectedTag(tag)]}
              onClick={() => {
                onSelect(tag.id);
              }}
              onTouchstart={e => {
                onTouchStart(e, tag);
              }}
              onTouchend={onTouchEnd}
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
