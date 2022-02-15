import { createApp } from 'vue'
import Loading from './Loading'

const loadingDirective = {
  mounted (el, binding) {
    const app = createApp(Loading).mount(document.createElement('div'))
    el.loadingInstance = app
    const titleText = binding.arg
    if (typeof titleText !== 'undefined') {
      app.setTitle(titleText)
    }
    if (binding.value) {
      append(el)
    }
  },
  updated (el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

function append (el) {
  const style = getComputedStyle(el)
  if (['relative', 'absolute', 'fixed'].indexOf(style.position) === -1) {
    el.style.position = 'relative'
  }
  el.appendChild(el.loadingInstance.$el)
}

function remove (el) {
  el.removeChild(el.loadingInstance.$el)
}

export default loadingDirective
