<template>
  <Header />
  <Tab />
  <router-view />
  <Player />
</template>

<script>
import Header from '@/components/header/Header.vue'
import Tab from '@/components/Tab.vue'
import Player from '@/components/player/Player.vue'

export default {
  name: 'App',
  components: {
    Header,
    Tab,
    Player
  },
  setup () {}
}
</script>

<style lang="scss" scoped></style>
