import { getScreenWH } from '@/utils/screen'
// 场景默认高度
export const SCENE_WIDTH = 1920
export const SCENE_HEIGHT = 1080

export default {
  name: 'Mixin',
  data() {
    return {
      browserWidth: SCENE_WIDTH,
      browserHeight: SCENE_HEIGHT,
    }
  },
  mounted() {
    this.resize()
    this.resizeEvent()
  },
  created() {},
  methods: {
    initElement(globalScale, screenWidth, screenHeight, hScale) {},
    resize() {
      const { screenWidth, screenHeight } = getScreenWH()
      // 放大因子
      const wScale = screenWidth / this.browserWidth
      const hScale = screenHeight / this.browserHeight
      const globalScale = wScale < hScale ? wScale : hScale
      this.initElement(globalScale, screenWidth, screenHeight, hScale)
    },
    // 改变浏览器时间
    resizeEvent() {
      let _this = this
      window.addEventListener('resize', () => {
        _this.resize()
      })
    },
  },
}
