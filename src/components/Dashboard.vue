<template>
  <div class="cities">
    <CityCard
      v-for="(card, cardIndex) in cards"
      :key="cardIndex"
      :card="card"
      :getIcon="getIcon"
    ></CityCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CityCard from '@/components/CityCard.vue';
import { WhetherService } from '@/services';

@Component({
  components: {
    CityCard,
  },
  props: {
    cards: Array,
  },
})

export default class Dashboard extends Vue {
  getIcon(iconCode: string) {
    return WhetherService.getIcon(iconCode);
  }
}
</script>

<style lang="scss">

</style>
