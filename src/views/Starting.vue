<template>
  <div class="page-container" :class="{ 'cursor-point': point }" @click="next()">
    <background
      class="background"
      :img-src="BackgroundImgSrc"
      id="background"
    />

    <div class="box forbid-select" />

    <img :src="LogoImgSrc" alt="" class="logo" />
  </div>
</template>

<script setup>
  import Background from '@/components/background.vue'
  import LogoImgSrc from '@/assets/image/logo.png'
  import BackgroundImgSrc from '@/assets/image/background.png'
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    isEnd: {
      type: Boolean,
      default: false,
    },
  })

  const router = useRouter()
  const canGoNext = ref(false)
  const point = ref(false)

  onMounted(() => {
    show()
  })

  function show() {
    gsap
      .timeline()
      .fromTo(
        '#background',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
        }
      )
      .fromTo(
        '.box',
        { left: '100%', opacity: 0 },
        {
          left: 0,
          opacity: 1,
          duration: 1,
        }
      )
      .fromTo(
        '.logo',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          onComplete() {
            if (!props.isEnd) {
              point.value = true
              canGoNext.value = true
            }
          },
        }
      )
  }

  function next() {
    if (canGoNext.value) {
      canGoNext.value = false
      gsap
        .timeline()
        .addLabel('stop', '+=1')
        .fromTo(
          '.page-container',
          { top: 0 },
          {
            top: '-100%',
            duration: 1,
            onComplete() {
              router.replace({ name: 'One' })
            },
          },
          'stop'
        )
    }
  }
</script>
<style scoped>
  .background {
    z-index: 1;
  }

  .box {
    position: absolute;
    top: 25%;
    height: 50%;
    width: 100%;
    background-color: #080404;
    z-index: 2;
  }

  .logo {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
  }

  .cursor-point {
    cursor: pointer;
  }
</style>
