<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div
        class="slider-page"
        v-for="item in sliders"
        :key="item.id"
      >
        <a :href="item.link">
          <img :src="item.pic"/>
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{'active': currentPageIndex === index}">
      </span>
    </div>
  </div>
</template>

<script>
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default {
  name: 'Slide',
  props: {
    sliders: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const currentPageIndex = ref(0)
    const rootRef = ref(null)
    const slider = ref(null)

    onMounted(() => {
      // 组件挂载时实例化slider
      slider.value = new BScroll(rootRef.value, {
        click: true,
        scrollX: true,
        scrollY: false,
        momentum: false,
        bounce: false,
        probeType: 2,
        slide: true
      })

      slider.value.on('slideWillChange', (page) => {
        currentPageIndex.value = page.pageX
      })
    })

    onUnmounted(() => {
      // 组件卸载时销毁slider实例
      slider.value.destroy()
    })

    onActivated(() => {
      // 组件激活时slider实例开启
      slider.value.enable()
      slider.value.refresh()
    })

    onDeactivated(() => {
      // 组件失活时slider实例关闭
      slider.value.disable()
    })

    return {
      rootRef,
      currentPageIndex
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variable';
  .slider {
    position: relative;
    touch-action: pan-y;
    overflow: hidden;
    .slider-group {
      .slider-page {
        display: inline-block;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        a {
          display: block;
          width: 100%;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots-wrapper {
      position: absolute;
      left: 50%;
      bottom: 12px;
      line-height: 12px;
      transform: translateX(-50%);
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }
</style>
