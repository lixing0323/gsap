import { getScreenWH } from '@/utils/screen'
import { onMounted } from 'vue'
import { SCENE_WIDTH, SCENE_HEIGHT } from '@/utils/mixin.js'

export default function mixinComp() {
  let callback = null

  onMounted(() => {
    create()
  })

  function create(func) {
    callback = func

    initData()
    resizeEvent()
  }

  function initData() {
    const { screenWidth, screenHeight } = getScreenWH()
    // 放大因子
    const scale = screenHeight / SCENE_HEIGHT
    callback(scale, screenWidth, screenHeight)
  }

  function resizeEvent() {
    window.addEventListener('resize', initData)
  }

  return {
    create,
  }
}
