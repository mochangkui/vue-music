const mutations = {
  // 设置播放状态
  setPlayingState (state, playing) {
    state.playing = playing
  },
  // 设置随机播放列表
  setSequenceList (state, list) {
    state.sequenceList = list
  },
  // 设置播放列表
  setPlayList (state, list) {
    state.playList = list
  },
  // 设置播放模式
  setPlayMode (state, mode) {
    state.playMode = mode
  },
  // 设置当前索引
  setCurrentIndex (state, index) {
    state.currentIndex = index
  },
  // 设置全屏播放
  setFullScreen (state, fullScreen) {
    state.fullScreen = fullScreen
  },
  setFavoriteList (state, list) {
    state.favoriteList = list
  },
  addSongLyric (state, { song, lyric }) {
    state.sequenceList.map((item) => {
      if (item.mid === song.mid) {
        item.lyric = lyric
      }
      return item
    })
  },
  setSearchHistory (state, searches) {
    state.searchHistory = searches
  },
  setPlayHistory (state, songs) {
    state.playHistory = songs
  }
}

export default mutations
