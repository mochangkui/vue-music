import axios from 'axios'

// 请求歌手详情
export function getSingerDetail () {
  return axios.get('/mock/singerDetail.json', {})
}
