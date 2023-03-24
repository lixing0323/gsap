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
  </div>
</template>

<script setup>
  import Background from '@/components/background.vue'
  import BackgroundImgSrc from '@/assets/image/two/bg.png'
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
    gsap.fromTo(
      '#background',
      { clipPath: 'inset(0% 50% 0% 50%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 3,
        onComplete() {
          point.value = true
          canGoNext.value = true
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
              router.push({ name: 'Three' })
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

  .cursor-point {
    cursor: pointer;
  }
</style>
