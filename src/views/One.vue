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

    <img :src="TextImgSrc" alt="" class="text" />
  </div>
</template>

<script setup>
  import Background from '@/components/background.vue'
  import TextImgSrc from '@/assets/image/one/text.png'
  import BackgroundImgSrc from '@/assets/image/one/bg.png'
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
        '.text',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
        }
      )
      .to('.text', {
        clipPath: 'inset(0px 0%)',
        duration: 1,
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
              router.replace({ name: 'Two' })
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

  .text {
    height: 100%;
    z-index: 2;
    clip-path: inset(0% 40% 0% 40%);
    position: absolute;
    left: 0;
  }

  .cursor-point {
    cursor: pointer;
  }
</style>
