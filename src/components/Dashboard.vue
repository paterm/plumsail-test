<template>
  <div id="app" class="app">
    <button class="app__settings-btn" :v-on:click="currentScreen = 'Settings'">
      <img class="app__settings-icon" :src="settingIcon" alt="setting">
    </button>

    <keep-alive>
      <component :is="component" ></component>
    </keep-alive>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DEFAULT_LOCATION } from '@/config';
import WhetherService from '@/services/whether-api.service';
import { TCard } from '@/types';
import Dashboard from '@/components/Dashboard_old.vue';
import Settings from '@/components/Settings.vue';
import SettingsIcon from '@/assets/settings.svg';

@Component({
  components: {
    Dashboard,
    Settings,
  },
})

export default class App extends Vue {
  private cards: TCard[] = [];

  currentScreen = 'Dashboard';

  getIcon(iconCode: string) {
    return WhetherService.getIcon(iconCode);
  }

  async mounted() {
    // Check locationStorage
    const initialData = await WhetherService.getInitialData(DEFAULT_LOCATION);

    if (initialData) {
      this.cards.push(initialData);
      console.log(this.cards);
    }
  }

  get settingIcon() {
    return SettingsIcon;
  }

  get component() {
    return this.currentScreen;
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
    height: 100%;

    &__list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__settings-btn {
      position: absolute;
      top: 5px;
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
  }
</style>
