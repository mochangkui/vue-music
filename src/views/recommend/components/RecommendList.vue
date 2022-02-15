<template>
  <div class="recommend-list">
    <h1 class="recommend-title" v-show="albums.length">热门歌单推荐</h1>
    <ul class="list">
      <li class="item" v-for="item in albums" :key="item.id">
        <img v-lazy="item.pic" alt="">
        <div class="text">
          <p class="name">{{item.username}}</p>
          <p class="title">{{item.title}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'RecommendList',
  props: {
    albums: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variable';
  .recommend-list {
    .recommend-title {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-theme;
    }
    .list {
      .item {
        display: flex;
        padding: 0 20px 20px 20px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 4px;
        }
        .text {
          font-size: $font-size-medium;
          flex: 1;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 20px;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .title {
            color: $color-text-d;
          }
        }
      }
    }
  }
</style>
