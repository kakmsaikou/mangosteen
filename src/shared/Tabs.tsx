import s from './Tabs.module.scss';
import { computed, defineComponent, PropType } from 'vue';

export const Tabs = defineComponent({
  props: {
    classPrefix: {
      type: String,
    },
    selected: {
      type: String as PropType<string>,
      required: false,
    },
    rerenderOnSelect: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    return () => {
      const tabs = context.slots.default?.();
      const normalizedTabs = tabs?.filter(tab => tab.type === Tab);
      if (!normalizedTabs) return () => null;
      for (let i = 0; i < normalizedTabs.length; i++) {
        if (normalizedTabs[i].type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children');
        }
      }
      const CP = props.classPrefix;
      return (
        <div class={[s.tabs, CP + '_tabs']}>
          <ol class={[s.tabs_nav, CP + '_tabs_nav']}>
            {normalizedTabs.map(item => (
              <li
                class={[
                  item.props?.name === props.selected
                    ? [s.selected, CP + '_selected']
                    : '',
                  CP + '_tabs_nav_item',
                ]}
                onClick={() =>
                  context.emit('update:selected', item.props?.name)
                }
              >
                {item.props?.name}
              </li>
            ))}
          </ol>
          {props.rerenderOnSelect ? (
            <div key={props.selected}>
              {normalizedTabs.find(
                item => item.props?.name === props.selected
              )}
            </div>
          ) : (
            normalizedTabs.map(item => (
              <div v-show={item.props?.name === props.selected}>{item}</div>
            ))
          )}
        </div>
      );
    };
  },
});

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <>{context.slots.default?.()}</>;
  },
});
