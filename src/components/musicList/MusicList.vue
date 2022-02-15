<template>
  <div class="music-list">
    <i class="icon-back back" @click="goBack"></i>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle" ref="playRef">
        <div class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <!-- <SongList :songs="songs"/> -->
    <Scroll class="scroll-content" :style="scrollStyle" :probeType="probeType" @scroll="scroll" v-loading="!songs.length">
      <ul class="song-list">
        <li class="item" v-for="(song, index) in songs" :key="song.id" @click="selectSong(song, index)">
          <div class="rank">
            <span :class="getRankClass(index)">{{ getRankText(index) }}</span>
          </div>
          <div class="content">
            <h2 class="name">{{song.name}}</h2>
            <p class="desc">{{ getDesc(song) }}</p>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
// import SongList from './SongList.vue'
import Scroll from '@/components/Scroll.vue'
import { mapActions } from 'vuex'
const RESERVED_HEIGHT = 40

export default {
  name: 'music-list',
  props: {
    title: {
      type: String,
      default: ''
    },
    pic: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      probeType: 3,
      imageHeight: 0,
      maxTranslateY: 0,
      scrollY: 0
    }
  },
  components: {
    // SongList,
    Scroll
  },
  computed: {
    bgImageStyle () {
      let zIndex = 0
      let height = 0
      let paddingTop = '70%'
      let translateZ = 0
      if (this.scrollY > this.maxTranslateY) {
        zIndex = 10
        height = `${RESERVED_HEIGHT}px`
        paddingTop = 0
        translateZ = 1
      }
      let scale = 1
      if (this.scrollY < 0) {
        scale = 1 + Math.abs(this.scrollY / this.imageHeight)
      }
      return {
        zIndex,
        height,
        paddingTop,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale}) translateZ(${translateZ}px)`
      }
    },
    playBtnStyle () {
      let display = ''
      if (this.scrollY >= this.maxTranslateY) {
        display = 'none'
      }
      return {
        display
      }
    },
    scrollStyle () {
      return {
        top: `${this.imageHeight}px`,
        bottom: 0
      }
    },
    filterStyle () {
      let blur = 0
      const scrollY = this.scrollY
      const imageHeight = this.imageHeight
      if (scrollY >= 0) {
        blur = Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) * 10
      }
      return {
        backdropFilter: `blur(${blur}px)`
      }
    }
  },
  methods: {
    ...mapActions(['selectPlay', 'randomPlay']),
    // 返回
    goBack () {
      this.$router.back()
    },
    scroll (pos) {
      console.log(pos.y)
      this.scrollY = -pos.y
    },
    // 处理排行数字
    getRankText (index) {
      if (index > 2) {
        return index + 1
      } else {
        return ''
      }
    },
    // 添加排行样式
    getRankClass (index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    },
    // 处理详情数据
    getDesc (song) {
      return `${song.singer}·${song.album}`
    },
    // 选择播放的歌曲
    selectSong (song, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    // 随机播放
    random () {
      this.randomPlay([{
        list: this.songs
      }])
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variable';
  @import '@/assets/scss/mixin';
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 16px;
      z-index: 21;
    }
    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      z-index: 20;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          width: 135px;
          padding: 7px 0;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
          margin: 0 auto;
          text-align: center;
          .icon-play {
            vertical-align: middle;
            margin-right: 6px;
            font-size: $font-size-medium-x;
          }
          .text {
            vertical-align: middle;
            font-size: $font-size-small;
          }
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .scroll-content {
      position: absolute;
      top: 263px;
      left: 0;
      right: 0;
      bottom: 0;
      // overflow: hidden;
      .song-list {
        background: $color-background;
        .item {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          height: 64px;
          font-size: $font-size-medium;
          .rank {
            flex: 0 0 25px;
            width: 25px;
            margin: 0 20px 0 10px;
            text-align: center;
            .icon {
              display: inline-block;
              width: 25px;
              height: 24px;
              background-size: 25px 24px;
              &.icon0 {
                @include bg-image('./images/first');
              }
              &.icon1 {
                @include bg-image('./images/second');
              }
              &.icon2 {
                @include bg-image('./images/third');
              }
            }
            .text {
              color: $color-theme;
              font-size: $font-size-large;
            }
          }
          .content {
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
              @include no-wrap();
              color: $color-text
            }
            .desc {
              @include no-wrap();
              margin-top: 4px;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }
</style>
