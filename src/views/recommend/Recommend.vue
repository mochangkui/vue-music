<template>
  <div class="recommend" v-loading:[titleText]="loading">
    <Scroll class="scroll-content">
      <div>
        <Slide :sliders="sliders" v-if="sliders.length" />
        <RecommendList :albums="albums" />
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getRecommend } from '@/api/getRecommend'
import Scroll from '@/components/Scroll.vue'
import Slide from './components/Slide.vue'
import RecommendList from './components/RecommendList.vue'

export default {
  name: 'Recommend',
  data () {
    return {
      sliders: [],
      albums: [],
      selectedAlbum: null,
      titleText: '正在载入中...'
    }
  },
  components: {
    Scroll,
    Slide,
    RecommendList
  },
  computed: {
    loading () {
      return !this.sliders.length && !this.albums.length
    }
  },
  mounted () {
    setTimeout(() => {
      getRecommend().then((res) => {
        const { code, result } = res.data
        if (code === 0) {
          this.sliders = result.sliders
          this.albums = result.albums
        }
      })
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
  .recommend {
    position: fixed;
    top: 84px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    .scroll-content {
      height: 100%;
      overflow: hidden;
    }
  }
</style>
