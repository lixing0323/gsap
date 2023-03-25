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

    <img :src="RectImgSrc" alt="" class="rect" />

    <self-adaption-img
      id="img-1"
      :img-src="BoxImgSrc"
      :width="width"
      :height="height"
      class="img-1"
    />
    <self-adaption-img
      id="img-2"
      :img-src="BoxImgSrc"
      :width="width"
      :height="height"
      class="img-2"
    />
    <self-adaption-img
      id="img-3"
      :img-src="BoxImgSrc"
      :width="width"
      :height="height"
      class="img-3"
    />
    <self-adaption-img
      id="img-4"
      :img-src="BoxImgSrc"
      :width="width"
      :height="height"
      class="img-4"
    />
  </div>
</template>

<script setup>
  import Background from '@/components/background.vue'
  import BackgroundImgSrc from '@/assets/image/five/bg.png'
  import RectImgSrc from '@/assets/image/five/rect.png'
  import BoxImgSrc from '@/assets/image/five/box.png'
  import SelfAdaptionImg from '../components/self-adaption-img.vue'
  import { getScreenWH } from '@/utils/screen'
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const canGoNext = ref(false)
  const point = ref(false)
  const width = 400
  const height = 6799

  onMounted(() => {
    show()
  })

  function show() {
    const { screenWidth, screenHeight } = getScreenWH()
    const move = (1200 * screenHeight) / 800

    gsap.timeline().fromTo(
      '#background',
      { clipPath: 'circle(0%)' },
      {
        clipPath: 'circle(100%)',
        duration: 3,
      }
    )

    gsap.fromTo(
      '.rect',
      { clipPath: 'circle(0%)' },
      {
        clipPath: 'circle(100%)',
        duration: 3,
      }
    )

    for (let i = 0; i < 4; i++) {
      const targets = `.img-${i + 1}`
      gsap
        .timeline()
        .fromTo(
          targets,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 2,
          }
        )
        .to(targets, {
          duration: 6,
          ease: 'none',
          yoyo: true,
          y: `-=${move}`,
          modifiers: {
            y: gsap.utils.unitize((y) => parseFloat(y) % move),
          },
          repeat: -1,
          onRepeat(self) {
            point.value = true
            canGoNext.value = true
          },
        })
    }
  }

  function next() {
    if (canGoNext.value) {
      canGoNext.value = false
      gsap
        .timeline()
        .addLabel('stop', '+=1')
        .fromTo(
          '.page-container',
          { clipPath: 'inset(0% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 50% 0% 50%)',
            duration: 2,
            onComplete() {
              router.replace({ name: 'End' })
            },
          },
          'stop'
        )
    }
  }
</script>
<style scoped>
  .page-container {
    background-size: 100% 100%;
    overflow: hidden;
    background-color: #080404;
    height: 100%;
  }

  .background {
    z-index: 1;
  }

  .rect {
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
  }

  .img-1 {
    left: 5%;
    top: -20%;
    position: absolute;
    z-index: 0;
  }

  .img-2 {
    left: 28%;
    top: -120%;
    position: absolute;
    z-index: 0;
  }

  .img-3 {
    left: 52%;
    top: -220%;
    position: absolute;
    z-index: 0;
  }

  .img-4 {
    right: 5%;
    top: -320%;
    position: absolute;
    z-index: 0;
  }

  .cursor-point {
    cursor: pointer;
  }
</style>
