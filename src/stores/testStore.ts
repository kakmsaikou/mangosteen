import { defineStore } from 'pinia';

type State = {};
type Actions = {};

export const use$1Store = (id: string | string[]) => {
  const storeId = typeof id === 'string' ? id : id.join('-');
  return defineStore<string, State, {}, Actions>(storeId, {
    state: (): State => ({}),

    actions: {},
  })();
};

import { defineStore } from 'pinia';

type State = {}
type Actions = {}

export const useStore = (id: string | string[]) => {
  const storeId = typeof id === 'string' ? id : id.join('-');
  return defineStore<string, State, {}, Actions>(storeId, {
    state: (): State => ({}),

    actions: {},
  })();
};