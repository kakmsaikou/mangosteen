import { defineComponent, PropType, reactive, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useAfterMe } from '../../hooks/useAfterMe';
import { Button } from '../../shared/Button';
import { Center } from '../../shared/Center';
import { Datetime } from '../../shared/DateTime';
import { FloatButton } from '../../shared/FloatButton';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { Money } from '../../shared/Money';
import { useItemStore } from '../../stores/useItemStore';
import s from './ItemSummary.module.scss';

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup: (props, context) => {
    if (!props.startDate || !props.endDate) {
      return () => <div>请先选择时间范围</div>;
    }
    const itemStore = useItemStore(
      `items-${props.startDate}-${props.endDate}`
    );
    useAfterMe(() => {
      itemStore.fetchItems(props.startDate, props.endDate);
    });
    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.resetItem;
        itemStore.fetchItems(props.startDate, props.endDate);
      }
    );
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    });
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) return;
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        _mock: 'itemIndexBalance',
      });
      Object.assign(itemsBalance, response.data);
    };
    useAfterMe(fetchItemsBalance);
    return () => (
      <div class={s.wrapper}>
        {itemStore.items && itemStore.items.length > 0 ? (
          <>
            <ul class={s.total}>
              <li>
                <span>收入</span>
                <span>
                  <Money value={itemsBalance.income} />
                </span>
              </li>
              <li>
                <span>支出</span>
                <span>
                  <Money value={itemsBalance.expenses} />
                </span>
              </li>
              <li>
                <span>净收入</span>
                <span>
                  <Money value={itemsBalance.balance} />
                </span>
              </li>
            </ul>
            <ol class={s.list}>
              {itemStore.items.map(item => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tags![0].sign}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.tags![0].name}</span>
                      <span class={s.amount}>
                        ￥<Money value={item.amount} />
                      </span>
                    </div>
                    <div class={s.time}>
                      <Datetime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {itemStore.hasMore ? (
                <Button
                  onClick={() => {
                    itemStore.fetchNextPage(props.startDate, props.endDate);
                  }}
                >
                  加载更多
                </Button>
              ) : (
                <span>没有更多</span>
              )}
            </div>
          </>
        ) : (
          <>
            <Center class={s.piggy_wrapper}>
              <Icon class={s.piggy} name='piggy' />
            </Center>
            <div class={s.button_wrapper}>
              <Button class={s.button}>
                <RouterLink to='/items/create'>开始记账</RouterLink>
              </Button>
            </div>
          </>
        )}
        <RouterLink to='/items/create'>
          <FloatButton iconName='add' />
        </RouterLink>
      </div>
    );
  },
});
