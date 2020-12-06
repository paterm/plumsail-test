<template>
  <div class="card">
    <div class="card__row">
      <p class="card__text card__text--bold">{{card.city}}, {{card.country}}</p>
    </div>
    <div class="card__row">
      <img class="card__icon" :src="image" alt="icon">
      <div class="card__temp">{{degrees}}&deg;C</div>
    </div>
    <div class="card__row">
      <p class="card__text">Feels like {{card.feelsLike}}&deg;C, {{card.description}}</p>
    </div>

    <div class="card__grid">
      <Wind :deg="card.windDeg" :speed="card.windSpeed"></Wind>
      <Pressure :pressure="card.pressure"></Pressure>
      <p v-if="card.humidity" class="card__text">Humidity: {{card.humidity}}</p>
      <p v-if="card.dewPoint" class="card__text">Dew point: {{card.dewPoint}}</p>
      <p class="card__text">Visibility: {{visibilityKm}} km</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TCard } from '@/types';
import Wind from './Wind.vue';
import Pressure from './Pressure.vue';

const CityCardProps = Vue.extend({
  props: {
    card: Object as () => TCard,
    getIcon: Function,
  },
});

@Component({
  components: {
    Wind,
    Pressure,
  },
})

export default class CityCard extends CityCardProps {
  get image() {
    return this.getIcon(this.card.icon);
  }

  get degrees() {
    return this.card.temp.toFixed(0);
  }

  get visibilityKm() {
    return (this.card.visibility / 1000).toFixed(1);
  }
}
</script>

<style lang="scss">
  .card {
    position: relative;
    text-align: left;
    width: 100%;
    padding: 20px;
    font-size: 14px;

    &__row {
      display: flex;
      align-items: center;

      & > * + * {
        margin-left: 10px !important;
      }

      & > * {
        flex: 1;
      }

      & + & {
        margin-top: 10px;
      }
    }

    &__text {
      margin: 0;
    }

    &__text--bold {
      font-weight: 700;
    }

    &__temp {
      font-size: 32px;
      font-weight: 700;
    }

    &__icon {
      flex: 0 0 100px;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      rid-column-gap: 5px;
      grid-row-gap: 5px;
      margin: 5px 0;
    }
  }
</style>
