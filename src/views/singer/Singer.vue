<template>
  <div class="singer" v-loading="!groupList.length">
    <Scroll class="scroll-content" v-if="groupList.length" :probeType="probeType" ref="scrollRef" @scroll="scroll">
      <ul ref="groupRef">
        <li class="group" v-for="group in groupList" :key="group.title">
          <h2 class="title">{{group.title}}</h2>
          <ul>
            <li class="item" v-for="item in group.list" :key="item.id" @click="toSingerDetail(item)">
              <img v-lazy="item.pic" alt="" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="fixed-title" v-show="scrollY > 0" :style="fixedStyle">{{currentGroup.title}}</div>
      <ShortcutList :shortcutList="shortcutList" :groupRef="groupRef" :scrollRef="scrollRef" :currentIndex="currentIndex" />
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view>
  </div>
  <!-- <router-view :data="selectedSinger"></router-view> -->
</template>

<script>
import Scroll from '@/components/Scroll.vue'
import ShortcutList from './components/ShortcutList.vue'
import { getSingerList } from '@/api/getSingerList'
import storage from 'good-storage'

export default {
  name: 'Singer',
  components: {
    Scroll,
    ShortcutList
  },
  data () {
    return {
      probeType: 3,
      groupList: [],
      listHeights: [],
      scrollY: 0,
      currentIndex: 0,
      distance: 0,
      selectedSinger: null,
      groupRef: {},
      scrollRef: {}
    }
  },
  methods: {
    // 监听滚动
    scroll (pos) {
      this.scrollY = -pos.y
    },
    // 计算每个组的高度
    calculate () {
      const childrenList = this.$refs.groupRef.children
      let height = 0
      this.listHeights.push(height)
      childrenList.forEach((item) => {
        height += item.clientHeight
        this.listHeights.push(height)
      })
    },
    // 跳转歌手详情页
    toSingerDetail (singerInfo) {
      this.selectedSinger = singerInfo
      storage.session.set('singerInfo', singerInfo)
      this.$router.push({
        path: `/singer/${singerInfo.mid}`
      })
    }
  },
  mounted () {
    // 获取歌手列表
    setTimeout(() => {
      getSingerList().then((res) => {
        const { code, result } = res.data
        if (code === 0) {
          this.groupList = result.singers
        }
      })
    }, 2000)
  },
  watch: {
    // 监听组列表的变化
    groupList () {
      this.$nextTick(() => {
        this.calculate()
        this.groupRef = this.$refs.groupRef
        this.scrollRef = this.$refs.scrollRef
      })
    },
    // 监听滚动位置的变化
    scrollY (newVal, oldVal) {
      for (let i = 0; i < this.listHeights.length; i++) {
        const heightTop = this.listHeights[i]
        const heightBottom = this.listHeights[i + 1]
        if (this.scrollY > heightTop && this.scrollY < heightBottom) {
          this.currentIndex = i
          this.distance = heightBottom - newVal
          return
        }
      }
    }
  },
  computed: {
    // 获取当前滑动位置的group
    currentGroup () {
      return this.groupList[this.currentIndex]
    },
    // 动态设置分类标题的样式(滚动顶上去的动画效果)
    fixedStyle () {
      const diff = this.distance < 30 ? this.distance - 30 : 0
      return {
        transform: `translate3d(0, ${diff}px, 0)`
      }
    },
    // 处理数据得到数组
    shortcutList () {
      return this.groupList.map((item) => {
        return item.title
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variable';
  .singer {
    position: fixed;
    top: 84px;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    .scroll-content {
      height: 100%;
      .group {
        .title {
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
          font-size: $font-size-small;
          color: $color-text-l;
          background: $color-highlight-background;
        }
        .item {
          display: flex;
          align-items: center;
          padding: 20px 0 0 30px;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .name {
            margin-left: 20px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .fixed-title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
</style>
