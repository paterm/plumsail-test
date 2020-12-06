import { TCity } from '@/types/CityType';

export const StoreService = {
  getSettings() {
    const storeData: string | null = localStorage.getItem('settings');
    let settings: any = {};

    try {
      if (storeData) settings = JSON.parse(storeData);
    } catch (e) {
      console.log(e);
    }

    return settings;
  },

  addCity(city: TCity) {
    const settings = this.getSettings();

    localStorage.setItem(''JSON.stringify(city));
  }
};
