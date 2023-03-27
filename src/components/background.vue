<template>
  <img :id="id" :src="imgSrc" alt="" class="background" />
</template>

<script setup>
  const props = defineProps({
    id: {
      type: String,
      default: 'background',
    },
    imgSrc: {
      type: String,
      default: undefined,
    },
  })
</script>

<style scoped>
  .background {
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }
</style>
