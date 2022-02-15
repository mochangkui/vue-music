import axios from 'axios'

// 请求推荐列表
export function getSingerList () {
  return axios.get('/mock/singerList.json', {})
}
