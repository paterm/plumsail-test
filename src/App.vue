<template>
  <div id="app" class="app">
    <button class="app__settings-btn" v-on:click="openSettings">
      <img class="app__settings-icon" :src="buttonIcon" alt="setting">
    </button>

    <keep-alive>
      <component
        :is="screen"
        :cards="cards"
        :settings="settings"
        :checkCity="checkCity"
        v-on:update-settings="updateSettings"
      ></component>
    </keep-alive>

    <span v-if="error">{{error}}</span>

    <Spinner v-if="inProgress"></Spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DEFAULT_LOCATION } from '@/config';
import { WhetherService, StoreService, GeolocationService } from '@/services';
import { TCard, TCity, TLocation } from '@/types';
import Dashboard from '@/components/Dashboard.vue';
import Settings from '@/components/Settings.vue';
import Spinner from '@/components/Spinner.vue';
import SettingsIcon from './assets/settings.svg';
import CloseIcon from './assets/close.svg';

enum EScreen {
  DASHBOARD = 'Dashboard',
  SETTINGS = 'Settings',
}

@Component({
  components: {
    Dashboard,
    Settings,
    Spinner,
  },
})

export default class App extends Vue {
  private cards: TCard[] = [];

  private currentScreen: string = EScreen.DASHBOARD;

  private settings: TCity[] = [];

  private error = '';

  private inProgress = true;

  mounted() {
    this.getWeather();
  }

  get buttonIcon(): string {
    return this.isDashboard ? SettingsIcon : CloseIcon;
  }

  get isDashboard(): boolean {
    return this.currentScreen === EScreen.DASHBOARD;
  }

  get screen(): string {
    return this.currentScreen;
  }

  async checkCity(city: string): Promise<boolean> {
    try {
      await WhetherService.get(city);
    } catch (e) {
      return false;
    }

    return true;
  }

  getWeather() {
    this.settings = StoreService.get();
    this.cards = [];

    if (!this.settings || !this.settings.length) {
      this.getDefaultWeather();
      return;
    }

    this.settings.forEach((city) => {
      WhetherService
        .get(city.city)
        .then((card) => {
          if (card) {
            this.cards.push({ ...card, pos: city.pos });
            this.cards = this.cards.sort((a, b) => (a.pos || 0) - (b.pos || 0));
          }
        })
        .finally(() => {
          this.inProgress = false;
        });
    });
  }

  async getDefaultWeather() {
    let location: TLocation = DEFAULT_LOCATION;

    try {
      const position = await GeolocationService.getCurrentPosition();

      location = { lat: position.coords.latitude, lon: position.coords.longitude };
    } catch (e) {
      console.log(e);
    }

    try {
      const card = await WhetherService.get(undefined, location);

      if (card) {
        this.cards.push(card);
        // StoreService.add({ city: card.city, pos: 0 });
        // this.settings = StoreService.get();
      }
    } catch (e) {
      this.error = 'Request error';
    }

    this.inProgress = false;
  }

  openSettings(): void {
    this.currentScreen = this.isDashboard ? EScreen.SETTINGS : EScreen.DASHBOARD;
  }

  updateSettings(settings: TCity[]): void {
    StoreService.update(settings);
    this.settings = StoreService.get();
    this.getWeather();
  }
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  * {
    box-sizing: border-box;
  }

  .app {
    position: relative;
    width: 280px;
    border: 1px solid #e4e4e4;

    &__list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__settings-btn {
      position: absolute;
      top: 18px;
      right: 5px;
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
      z-index: 1;
      transition: opacity .2s;
    }

    &__settings-btn:hover {
      opacity: .7;
    }

    &__settings-icon {
      width: 20px;
      height: 20px;
    }

    .card + .card {
      border-top: 1px solid #e4e4e4;
    }
  }
</style>
