<template>
  <ul class="shortcut-list"
    @touchstart.stop.prevent="onShortcutTouchStart"
    @touchmove.stop.prevent="onShortcutTouchMove"
    @touchend.stop.prevent
  >
    <li class="item" :class="currentIndex === index ? 'current' : ''" v-for="(item, index) in shortcutList" :key="item" :data-index="index">{{item}}</li>
  </ul>
</template>

<script>

export default {
  name: 'ShortcutList',
  props: {
    shortcutList: {
      type: Array,
      default: () => []
    },
    groupRef: {
      type: Object,
      default: () => {}
    },
    scrollRef: {
      type: Object,
      default: () => {}
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      touch: {}
    }
  },
  methods: {
    // 开始触碰
    onShortcutTouchStart (e) {
      const anchorIndex = parseInt(e.target.dataset.index)
      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this.scrollTo(this.touch.anchorIndex)
    },

    // 触碰中
    onShortcutTouchMove (e) {
      this.touch.y2 = e.touches[0].pageY
      const delta = (this.touch.y2 - this.touch.y1) / 18 | 0
      const anchorIndex = this.touch.anchorIndex + delta
      this.scrollTo(anchorIndex)
    },

    // 滚动到对应位置
    scrollTo (index) {
      if (isNaN(index)) {
        return
      }
      index = Math.max(0, Math.min(this.shortcutList.length - 1, index))
      const targetEl = this.groupRef.children[index]
      const scroll = this.scrollRef.scroll
      scroll.scrollToElement(targetEl, 400)
    }
  }
}
</script>

<style lang="scss" scoped>
  .shortcut-list {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    .item {
      font-size: 12px;
      padding: 3px;
      &.current {
        color: #ffcd32;
      }
    }
  }
</style>
