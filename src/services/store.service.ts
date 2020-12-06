import { TCity } from '@/types/CityType';

const STORE_NAME = 'store';

export const StoreService = {
  get() {
    const storeData: string | null = localStorage.getItem(STORE_NAME);
    let store: TCity[] = [];

    try {
      if (storeData) store = JSON.parse(storeData);
    } catch (e) {
      console.log(e);
    }

    return store.sort((a, b) => a.pos - b.pos);
  },

  add(city: TCity) {
    const store = this.get();

    store.push(city);

    localStorage.setItem(STORE_NAME, JSON.stringify(store));
  },

  remove(city: TCity) {
    let store = this.get();

    store = store.filter((item) => item.city !== city.city);

    localStorage.setItem(STORE_NAME, JSON.stringify(store));
  },

  update(data: TCity[]) {
    localStorage.setItem(STORE_NAME, JSON.stringify(data));
  },
};
