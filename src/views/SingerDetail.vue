<template>
  <div class="singer-detail">
    <MusicList :songs="singerDetail" :title="title" :pic="pic" />
  </div>
</template>

<script>
import MusicList from '@/components/musicList/MusicList.vue'
import { getSingerDetail } from '@/api/getSingerDetail'

export default {
  name: 'SingerDetail',
  components: {
    MusicList
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      singerDetail: []
    }
  },
  computed: {
    title () {
      return this.data.name
    },
    pic () {
      return this.data.pic
    }
  },
  mounted () {
    // 获取歌手详情
    setTimeout(() => {
      getSingerDetail().then((res) => {
        const { code, result } = res.data
        if (code === 0) {
          this.singerDetail = result.songs
        }
      })
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variable';
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
