<template>
  <Scroll class="scroll-content" :probeType="probeType" @scroll="scroll" v-loading="!songs.length">
    <ul class="song-list">
      <li class="item" v-for="(song, index) in songs" :key="song.id">
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
</template>

<script>
import Scroll from '@/components/Scroll.vue'

export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      probeType: 3
    }
  },
  components: {
    Scroll
  },
  methods: {
    scroll (pos) {},
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variable';
  @import '@/assets/scss/mixin';
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
</style>
