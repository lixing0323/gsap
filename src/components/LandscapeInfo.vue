<template>
  <div class="landscape-info" :class="{ 'is-landscape': isLandscape }">
    <img :src="imgSrc" alt="" />
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { isChsLang } from '@/lang'
  import { ossImageBaseUrl } from '@/config'
  const isLandscape = ref(true)

  const calcLandscape = () => {
    const mql = window.matchMedia('(orientation: portrait)')
    onMatchMeidaChange(mql)
    mql.addListener(onMatchMeidaChange)

    // console.log('window.orientation', window.orientation)
    // isLandscape.value =
    //   window.orientation === undefined ||
    //   window.orientation === 90 ||
    //   window.orientation === -90 ||
    //   window.orientation === 270
  }

  function onMatchMeidaChange(mql) {
    if (mql.matches) {
      isLandscape.value = false
    } else {
      isLandscape.value = true
    }
  }

  const imgSrc = computed(() => {
    return (
      ossImageBaseUrl +
      (isChsLang()
        ? '/images/landscapeInfoCn.png'
        : '/images/landscapeInfoEn.png')
    )
  })

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
    background-color: #222222f2;
  }
  .landscape-info img {
    width: 30%;
  }
  .is-landscape {
    display: none;
  }
</style>
