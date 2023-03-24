<template>
  <div class="container">
    <div
      class="left"
      :style="{ width: `${spaceWidth}px`, height: `${height}px` }"
    />

    <div
      class="content"
      :style="{ width: `${contentWidth}px`, height: `${height}px` }"
    >
      <router-view :key="key" />
    </div>

    <div
      class="right"
      :style="{ width: `${spaceWidth}px`, height: `${height}px` }"
    />
  </div>
  <landscape-info />
</template>

<script setup>
  import { RouterView, useRouter } from 'vue-router'
  import LandscapeInfo from '@/components/LandscapeInfo.vue'
  import { computed, onMounted, ref } from 'vue'
  import mixinComp from '@/utils/mixinComp.js'

  const route = useRouter()
  const key = computed(() => route.path)
  const spaceWidth = ref(0)
  const contentWidth = ref(0)
  const height = ref(0)
  import { SCENE_WIDTH, SCENE_HEIGHT } from '@/utils/mixin.js'

  onMounted(() => {
    mixinComp().create(initElement)
  })

  function initElement(scale, screenWidth, screenHeight) {
    contentWidth.value = SCENE_WIDTH * scale
    spaceWidth.value = (screenWidth - contentWidth.value) / 2
    height.value = screenHeight
  }
</script>

<style scoped>
  .container {
    display: flex;
  }

  .left {
    background-color: #080404;
    z-index: 99;
  }

  .content {
    position: relative;
  }

  .right {
    background-color: #080404;
    z-index: 99;
  }
</style>
