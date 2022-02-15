import axios from 'axios'

// 请求推荐列表
export function getRecommend () {
  return axios.get('/mock/recommend.json', {})
}
