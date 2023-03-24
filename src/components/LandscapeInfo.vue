<template>
  <div class="landscape-info" :class="{ 'is-landscape': isLandscape }">
    <img class="image" :src="LandscapeImgSrc" alt="" />
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import LandscapeImgSrc from '@/assets/landscape.png'

  const isLandscape = ref(true)

  const calcLandscape = () => {
    isLandscape.value =
      window.orientation === undefined ||
      window.orientation === 90 ||
      window.orientation === -90 ||
      window.orientation === 270
    console.log(
      'window.orientation',
      window.orientation,
      '是否横向=',
      isLandscape.value
    )
  }

  onMounted(() => {
    calcLandscape()
    window.addEventListener('orientationchange', () => {
      calcLandscape()
    })
  })
</script>

<style scoped>
  .landscape-info {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 99999;
    top: 0;
    background-color: #222222f2;
  }
  .landscape-info img {
    width: 30%;
  }
  .is-landscape {
    display: none;
  }
</style>
