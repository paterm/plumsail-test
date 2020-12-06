<template>
  <div class="settings">
    <div class="settings__title">Settings</div>

    <ul class="settings__list">
      <draggable
        v-model="cloneSettings"
        @change="onDragChange"
        handle=".settings__handle"
      >
        <li class="settings__item" v-for="(city, cityIndex) of cloneSettings" :key="cityIndex">
          <img class="settings__handle" :src="hamburgerIcon" alt="drag-handle">
          <span class="settings__item-name">{{city.city}}</span>
          <button class="settings__remove" v-on:click="handleDelete(cityIndex)">
            <img class="settings__remove-icon" :src="trashIcon" alt="trash">
          </button>
        </li>
      </draggable>
    </ul>

    <form v-on:submit="onSubmit" class="settings__form">
      <input
        class="settings__field"
        type="text"
        v-model="name"
        placeholder="City name"
        :disabled="inProgress"
      >
      <button
        class="settings__add"
        :disabled="inProgress"
      >Add</button>
    </form>

    <span class="settings__error" v-if="error">{{error}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { TCity } from '@/types';
import TrashIcon from '@/assets/trash.svg';
import HamburgerIcon from '@/assets/hamburger.svg';

const SettingsProps = Vue.extend({
  props: {
    settings: Array as () => TCity[],
    checkCity: Function,
  },
});

@Component<Settings>({
  components: {
    draggable,
  },
})

export default class Settings extends SettingsProps {
  name = '';

  error = '';

  cloneSettings: TCity[] = [...this.settings];

  inProgress = false;

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.cloneSettings) return;

    this.inProgress = true;

    const found = this.cloneSettings
      .find((city: TCity) => city.city.toLowerCase() === this.name.toLowerCase());

    if (found) {
      this.error = 'This city has already been added';
      this.inProgress = false;
      return;
    }

    const isValidCity = await this.checkCity(this.name);

    if (!isValidCity) {
      this.error = 'This city was not found';
      this.inProgress = false;
      return;
    }

    this.cloneSettings.push({ city: this.name, pos: this.cloneSettings.length });
    this.cloneSettings = this.cloneSettings.map((item, index) => ({ ...item, pos: index }));
    this.$emit('update-settings', this.cloneSettings);
    this.error = '';
    this.name = '';
    this.inProgress = false;
  }

  onDragChange(): void {
    this.cloneSettings = this.cloneSettings.map((item, index) => ({ ...item, pos: index }));
    this.$emit('update-settings', this.cloneSettings);
  }

  handleDelete(cityIndex: number) {
    if (!this.cloneSettings) return;

    this.cloneSettings.splice(cityIndex, 1);
    this.cloneSettings = this.cloneSettings.map((item, index) => ({ ...item, pos: index }));
    this.$emit('update-settings', this.cloneSettings);
  }

  get trashIcon() {
    return TrashIcon;
  }

  get hamburgerIcon() {
    return HamburgerIcon;
  }
}
</script>

<style lang="scss" scoped>
  .settings {
    padding: 20px;

    &__title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
    }

    &__list {
      margin: 0 0 20px;
      padding: 0;
      list-style: none;
    }

    &__item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 2px 5px;
      background: #e7e7e7;

      & + & {
        margin-top: 5px;
      }
    }

    &__item-name {}

    &__remove {
      margin-left: auto;
      background: none;
      border: none;
      transition: opacity .2s;
      outline: none;
      cursor: pointer;

      &:hover {
        opacity: .7;
      }
    }

    &__remove-icon {
      width: 20px;
    }

    &__form {
      display: flex;
    }

    &__field {
      border: none;
      border-bottom: 1px solid #5a5858;
    }

    &__add {
      margin-left: 10px;
      padding: 5px 20px;
      border: none;
      background: #7d7dea;
      font-weight: bold;
      color: #fff;
      outline: none;
      transition: background .2s;

      &:disabled {
        background: #ccc;
      }
    }

    &__error {
      display: block;
      margin-top: 5px;
      font-size: 12px;
      color: red;
    }

    &__handle {
      width: 20px;
      margin-right: 10px;
      cursor: grab;
    }
  }
</style>
