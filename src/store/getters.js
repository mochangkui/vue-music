// 获取当前歌曲
export const currentSong = (state) => state.playList[state.currentIndex] || {}

// 获取是否全屏播放
export const fullScreen = state => state.fullScreen

// 获取播放状态
export const playing = state => state.playing

// 获取当前播放索引
export const currentIndex = state => state.currentIndex

// 获取播放列表
export const playList = state => state.playList
