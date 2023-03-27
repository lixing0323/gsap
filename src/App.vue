<template>
  <div :class="{ 'flex-container': flexContainer }">
    <div class="left" :style="spaceObject" />

    <div class="content" :style="contentObject">
      <router-view :key="key" />
    </div>

    <div class="right" :style="spaceObject" />
  </div>
  <landscape-info v-if='false' />
</template>

<script setup>
  import { RouterView, useRouter } from 'vue-router'
  import LandscapeInfo from '@/components/LandscapeInfo.vue'
  import { computed, onMounted, reactive, ref } from 'vue'
  import mixinComp from '@/utils/mixinComp.js'

  const route = useRouter()
  const key = computed(() => route.path)
  const space = reactive({ width: 0, height: 0 })
  const content = reactive({ width: 0, height: 0 })
  const flexContainer = ref(true)
  import { SCENE_WIDTH, SCENE_HEIGHT } from '@/utils/mixin.js'

  const spaceObject = computed(() => {
    return {
      width: space.width ? `${space.width}px` : null,
      height: space.height ? `${space.height}px` : null,
    }
  })

  const contentObject = computed(() => {
    return {
      width: content.width ? `${content.width}px` : null,
      height: content.height ? `${content.height}px` : null,
      top: !flexContainer.value ? `${space.height}px` : 0,
      left: flexContainer.value ? `${space.width}px` : 0,
    }
  })

  onMounted(() => {
    mixinComp().create(initElement)
  })

  function initElement(scale, screenWidth, screenHeight, isBaseWidth) {
    flexContainer.value = !isBaseWidth
    if (isBaseWidth) {
      content.height = SCENE_HEIGHT * scale
      content.width = screenWidth

      space.height = (screenHeight - content.height) / 2
      space.width = screenWidth
    } else {
      content.width = SCENE_WIDTH * scale
      content.height = screenHeight

      space.width = (screenWidth - content.width) / 2
      space.height = screenHeight
    }
  }
</script>

<style scoped>
  .flex-container {
    display: flex;
  }

  .left {
    background-color: #080404;
    z-index: 999;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
  }

  .content {
    position: absolute;
    overflow: hidden;
  }

  .right {
    background-color: #080404;
    z-index: 999;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
  }
</style>
