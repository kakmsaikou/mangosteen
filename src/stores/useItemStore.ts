import { defineStore } from 'pinia';
import { http } from '../shared/Http';

type State = {
  items: Item[];
  hasMore: boolean;
  page: number;
};
type Actions = {
  _fetch: (startDate?: string, endDate?: string, firstPage?: boolean) => void;
  fetchItems: (startDate?: string, endDate?: string) => void;
  fetchNextPage: (startDate?: string, endDate?: string) => void;
  resetItem: () => void;
};

export const useItemStore = (id: string | string[]) => {
  const storeId = typeof id === 'string' ? id : id.join('-');
  return defineStore<string, State, {}, Actions>(storeId, {
    state: () => ({
      items: [],
      hasMore: false,
      page: 0,
    }),

    actions: {
      async _fetch(startDate, endDate, firstPage = false) {
        if (!startDate || !endDate) return;
        const response = await http.get<Resources<Item>>(
          'items',
          {
            happen_after: startDate,
            happen_before: endDate,
            page: firstPage ? 1 : this.page + 1,
          },
          { _mock: 'itemIndex', _autoLoading: true }
        );
        const { resources, pager } = response.data;
        this.items = firstPage ? resources : [...this.items, ...resources];
        this.hasMore =
          (pager.page - 1) * pager.per_page + resources.length < pager.count;
        this.page += 1;
      },
      async fetchItems(startDate, endDate) {
        this._fetch(startDate, endDate, true);
      },
      async fetchNextPage(startDate, endDate) {
        this._fetch(startDate, endDate);
      },
      resetItem() {
        this.items = [];
        this.hasMore = false;
        this.page = 0;
      },
    },
  })();
};
