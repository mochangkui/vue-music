<template>
  <div class="loading">
    <div class="loading-content">
      <img src="./loading.gif" alt="">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      title: '加载中...'
    }
  },
  methods: {
    setTitle (title) {
      this.title = title
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variable';
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .loading-content {
      text-align: center;
      img {
        width: 30px;
        height: 30px;
      }
      .desc {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
      }
    }
  }
</style>
