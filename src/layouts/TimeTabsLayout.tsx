import { Overlay } from 'vant';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { Form, FormItem } from '../shared/Form';
import { OverlayIcon } from '../shared/OverlayIcon';
import { Tab, Tabs } from '../shared/Tabs';
import { Time } from '../shared/time';
import { MainLayout } from './MainLayout';
import s from './TimeTabsLayout.module.scss';

const demo = defineComponent({
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
});

export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true,
    },
  },
  setup: props => {
    const refSelected = ref('本月');
    const time = new Time();
    const tempTime = reactive<{ start?: string; end?: string }>({
      start: new Time().format(),
      end: new Time().format()
    }); // 用于存放自定义时间的临时变量
    const customTime = reactive<{ start?: string; end?: string }>({});
    const timeList = [
      {
        start: time.firstDayOfMonth().format(),
        end: time.lastDayOfMonth().format(),
      },
      {
        start: time.add(-1, 'month').firstDayOfMonth().format(),
        end: time.add(-1, 'month').lastDayOfMonth().format(),
      },
      {
        start: time.firstDayOfYear().format(),
        end: time.lastDayOfYear().format(),
      },
    ];
    const refOverlayVisible = ref(false);
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
      Object.assign(customTime, tempTime);
    };
    const onSelected = (value: string) => {
      value === '自定义时间' && (refOverlayVisible.value = true);
    };
    return () => (
      <MainLayout>
        {{
          title: () => '',
          icon: () => <OverlayIcon />,
          default: () => (
            <>
              <Tabs
                v-model:selected={refSelected.value}
                classPrefix="customTabs"
                onUpdate:selected={onSelected}
              >
                <Tab name="本月">
                  <props.component
                    startDate={timeList[0].start}
                    endDate={timeList[0].end}
                  />
                </Tab>
                <Tab name="上月">
                  <props.component
                    startDate={timeList[1].start}
                    endDate={timeList[1].end}
                  />
                </Tab>
                <Tab name="今年">
                  <props.component
                    startDate={timeList[2].start}
                    endDate={timeList[2].end}
                  />
                </Tab>
                <Tab name="自定义时间">
                  <props.component
                    startDate={customTime.start}
                    endDate={customTime.end}
                  />
                </Tab>
              </Tabs>
              <Overlay show={refOverlayVisible.value} class={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem
                        label="开始时间"
                        v-model={tempTime.start}
                        type="date"
                      />
                      <FormItem
                        label="结束时间"
                        v-model={tempTime.end}
                        type="date"
                      />
                      <FormItem>
                        <div class={s.actions}>
                          <button
                            type="button"
                            onClick={() => {
                              refOverlayVisible.value = false;
                            }}
                          >
                            取消
                          </button>
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
