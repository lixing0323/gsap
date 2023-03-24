<template>
  <div class="page-container" :class="{ 'cursor-point': point }" @click="next()">
    <background
      class="background"
      :img-src="BackgroundImgSrc"
      id="background"
    />

    <self-adaption-img
      id="img-1"
      :img-src="ImgSrc_1"
      :width="width"
      :height="height"
      class="img-1"
    />

    <self-adaption-img
      id="img-2"
      :img-src="ImgSrc_2"
      :width="width"
      :height="height"
      class="img-2"
    />

    <self-adaption-img
      id="img-3"
      :img-src="ImgSrc_3"
      :width="width"
      :height="height"
      class="img-3"
    />

    <self-adaption-img
      id="img-4"
      :img-src="ImgSrc_4"
      :width="width"
      :height="height"
      class="img-4"
    />

    <self-adaption-img
      id="img-5"
      :img-src="ImgSrc_5"
      :width="width"
      :height="height"
      class="img-5"
    />
  </div>
</template>

<script setup>
  import Background from '@/components/background.vue'
  import BackgroundImgSrc from '@/assets/image/four/bg.png'
  import ImgSrc_1 from '@/assets/image/four/1.png'
  import ImgSrc_2 from '@/assets/image/four/2.png'
  import ImgSrc_3 from '@/assets/image/four/3.png'
  import ImgSrc_4 from '@/assets/image/four/4.png'
  import ImgSrc_5 from '@/assets/image/four/5.png'
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import { useRouter } from 'vue-router'
  import SelfAdaptionImg from '../components/self-adaption-img.vue'

  const router = useRouter()
  const canGoNext = ref(false)
  const point = ref(false)
  const width = 355
  const height = 614

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
        '.img-1',
        { scale: 3, opacity: 0 },
        {
          scale: 0.8,
          opacity: 0.5,
          duration: 2,
        }
      )
      .to('.img-1', {
        scale: 1,
        opacity: 1,
        duration: 1,
      })
      .fromTo(
        '.img-2',
        { scale: 3, opacity: 0 },
        {
          opacity: 0.5,
          scale: 0.8,
          duration: 2,
        }
      )
      .to('.img-2', {
        scale: 1,
        opacity: 1,
        duration: 1,
      })
      .fromTo(
        '.img-3',
        { scale: 3, opacity: 0 },
        {
          scale: 0.8,
          opacity: 0.5,
          duration: 2,
        }
      )
      .to('.img-3', {
        scale: 1,
        opacity: 1,
        duration: 1,
      })
      .fromTo(
        '.img-4',
        { scale: 3, opacity: 0 },
        {
          opacity: 0.5,
          scale: 0.8,
          duration: 2,
        }
      )
      .to('.img-4', {
        scale: 1,
        opacity: 1,
        duration: 1,
      })
      .fromTo(
        '.img-5',
        { scale: 3, opacity: 0 },
        {
          opacity: 0.5,
          scale: 0.8,
          duration: 2,
        }
      )
      .to('.img-5', {
        scale: 1,
        duration: 1,
        opacity: 1,
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
              router.push({ name: 'Five' })
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

  .img-1 {
    left: 0;
    top: 20%;
    position: absolute;
    z-index: 2;
  }

  .img-2 {
    left: 20%;
    top: 20%;
    position: absolute;
    z-index: 2;
    opacity: 0;
  }

  .img-3 {
    left: 40%;
    top: 20%;
    position: absolute;
    z-index: 2;
  }

  .img-4 {
    left: 60%;
    top: 20%;
    position: absolute;
    z-index: 2;
  }

  .img-5 {
    left: 80%;
    top: 20%;
    position: absolute;
    z-index: 2;
  }

  .cursor-point {
    cursor: pointer;
  }
</style>
