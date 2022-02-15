<template>
  <div class="header">
    <i class="icon"></i>
    <h1 class="text">Music</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  setup () {}
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variable";
  @import "@/assets/scss/mixin";
  .header {
    height: 44px;
    text-align: center;
    color: $color-theme;
    .icon {
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 30px;
      height: 32px;
      margin-right: 9px;
      @include bg-image('logo');
      background-size: 30px 32px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: $font-size-large;
    }
  }
</style>
