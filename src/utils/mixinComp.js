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

    // 是否基于宽
    const isBaseWidth = SCENE_WIDTH / SCENE_HEIGHT > screenWidth / screenHeight
    // 放大因子
    const scale = isBaseWidth
      ? screenWidth / SCENE_WIDTH
      : screenHeight / SCENE_HEIGHT

    console.log(
      isBaseWidth,
      SCENE_WIDTH / SCENE_HEIGHT,
      screenWidth / screenHeight
    )
    // 回调函数
    callback(scale, screenWidth, screenHeight, isBaseWidth)
  }

  function resizeEvent() {
    window.addEventListener('resize', initData)
  }

  return {
    create,
  }
}
