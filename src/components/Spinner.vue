<template>
  <div class="lds-ring"><div/><div/><div/><div/></div>
</template>

<script>
import { Vue } from 'vue-property-decorator';

export default class Spinner extends Vue {}
</script>

<style lang="scss" scoped>
  .lds-ring {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 80px 0;
    height: 80px;

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 24px;
      height: 24px;
      margin: 8px;
      border: 2px solid #b7b7b7 ;
      border-color: #b7b7b7 transparent transparent transparent;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }

  @keyframes lds-ring {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
