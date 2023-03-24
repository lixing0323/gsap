<template>
  <div
    class="page-container"
    :class="{ 'cursor-point': point }"
    @click="next()"
  >
    <background
      class="background"
      :img-src="BackgroundImgSrc"
      id="background"
    />

    <img :src="BoxImgSrc" alt="" class="box" />

    <img :src="RollImgSrc" alt="" class="roll" />
  </div>
</template>

<script setup>
  import Background from '@/components/background.vue'
  import BackgroundImgSrc from '@/assets/image/three/bg.png'
  import BoxImgSrc from '@/assets/image/three/box.png'
  import RollImgSrc from '@/assets/image/three/roll.png'
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import { useRouter } from 'vue-router'

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
          duration: 1,
        }
      )
      .fromTo(
        '.box',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
        }
      )
      .fromTo(
        '.roll',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
        }
      )
      .to('.roll', {
        duration: 10,
        ease: 'none',
        x: '-=88%',
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % 500),
        },
        onComplete() {
          point.value = true
          canGoNext.value = true
        },
      })
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
              router.replace({ name: 'Four' })
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
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
    z-index: 3;
  }

  .roll {
    width: 200%;
    top: 28%;
    height: 53%;
    left: 50%;
    margin: 0 auto;
    position: absolute;
    z-index: 2;
  }

  .cursor-point {
    cursor: pointer;
  }
</style>
