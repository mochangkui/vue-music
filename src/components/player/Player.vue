<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" alt="">
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{currentSong.name}}</h1>
        <h2 class="subtitle">{{currentSong.singer}}</h2>
      </div>
      <div class="bottom">
        <div class="icon icon-left">
          <i class="icon-prev" @click="prev"></i>
        </div>
        <div class="icon icon-center">
          <i class="icon-pause" @click="togglePlay" :class="playIcon"></i>
        </div>
        <div class="icon icon-right">
          <i class="icon-next" @click="next"></i>
        </div>
        <div class="icon icon-right">
          <i class="icon-not-favorite"></i>
        </div>
      </div>
    </div>
    <audio ref="audioRef" @canplay="canplay"></audio>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Player',
  computed: {
    ...mapGetters(['currentSong', 'fullScreen', 'playing', 'currentIndex', 'playList']),
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    }
  },
  data () {
    return {
      songReady: false
    }
  },
  watch: {
    // 监听当前歌曲的变化
    currentSong (newSong) {
      const audioRef = this.$refs.audioRef
      audioRef.src = newSong.url
      audioRef.play()
    },
    // 监听播放状态
    playing (newPlaying) {
      if (!this.songReady) {
        return
      }
      const audioRef = this.$refs.audioRef
      newPlaying ? audioRef.play() : audioRef.pause()
    }
  },
  methods: {
    ...mapMutations(['setPlayingState', 'setCurrentIndex']),

    // 切换播放
    togglePlay () {
      this.setPlayingState(!this.playing)
    },

    // 当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）
    canplay () {
      this.songReady = true
    },

    // 上一首
    prev () {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop() // 歌曲只有一首，进行单曲循环
      } else {
        let index = this.currentIndex - 1
        if (index < 0) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
      }
      this.songReady = false
    },

    // 下一首
    next () {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop() // 歌曲只有一首，进行单曲循环
      } else {
        let index = this.currentIndex + 1
        if (index > this.playList.length - 1) {
          index = 0
        }
        this.setCurrentIndex(index)
      }
      this.songReady = false
    },

    // 循环播放
    loop () {

    }
  }
}
</script>

<style lang='scss' scoped>
  @import '@/assets/scss/variable';
  @import '@/assets/scss/mixin';
  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      background: $color-background;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .top {
        position: relative;
        margin-bottom: 25px;
        .back {
          position: absolute;
          top: 0;
          left: 6px;
          z-index: 50;
        }
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          @include no-wrap();
          font-size: $font-size-large;
          color: $color-text;
        }
        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-text;
        }
      }
      .bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 50px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .icon {
          font-size: 30px;
          color: $color-theme;
          &.icon-center {
            font-size: 40px;
          }
        }
      }
    }
  }
</style>
