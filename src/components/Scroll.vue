<template>
  <div class="scroll" ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { onActivated, onMounted, onUnmounted, onDeactivated, ref } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

export default {
  name: 'Scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'],
  setup (props, context) {
    const { emit } = context
    const rootRef = ref(null)
    const scroll = ref(null)

    onMounted(() => {
      scroll.value = new BScroll(rootRef.value, {
        observeDOM: true,
        ...props
      })
      if (props.probeType > 0) {
        scroll.value.on('scroll', (pos) => {
          emit('scroll', pos)
        })
      }
    })

    onUnmounted(() => {
      scroll.value.destroy()
    })

    onActivated(() => {
      scroll.value.enable()
      scroll.value.refresh()
    })

    onDeactivated(() => {
      scroll.value.disable()
    })
    return {
      rootRef,
      scroll
    }
  }
}
</script>

<style lang="scss" scoped></style>
