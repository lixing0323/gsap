<template>
  <img alt="" :id="id" :src="imgSrc" />
</template>

<script setup>
  import { computed, onMounted, reactive } from 'vue'
  import mixinComp from '@/utils/mixinComp.js'
  import { resizeImage } from '@/utils/screen.js'

  const props = defineProps({
    id: {
      type: String,
      default: 'img',
    },
    imgSrc: {
      type: String,
      default: undefined,
    },
    width: {
      type: [Number, String],
      default: undefined,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
  })

  onMounted(() => {
    mixinComp().create(initElement)
  })

  function isUndefined(val) {
    return val === undefined
  }

  function isPercent(val) {
    return String(val).indexOf('%') !== -1
  }

  function isPixel(val) {
    return String(val).indexOf('px') !== -1
  }

  function getScaleValue(scale, data) {
    let val
    if (isUndefined(data)) {
      val = null
    } else if (isPercent(data)) {
      const num = Number(data.replace(/%/g, ''))
      val = `${num * scale}%`
    } else if (isPixel(data)) {
      const num = Number(data.replace(/px/g, ''))
      val = `${num * num}px`
    } else {
      val = data * scale
    }
    return val
  }

  async function initElement(scale, w, h) {
    const ele = document.getElementById(props.id)
    resizeImage(ele, scale * props.width, scale * props.height)
  }
</script>

<style scoped></style>
