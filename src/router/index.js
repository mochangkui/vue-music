import { createRouter, createWebHashHistory } from 'vue-router'
import Singer from '../views/singer/Singer.vue'
import SingerDetail from '../views/SingerDetail.vue'
import Recommend from '../views/recommend/Recommend.vue'
import TopList from '../views/TopList.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    name: '/',
    redirect: 'Recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [
      {
        path: ':id',
        name: 'SingerDetail',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    name: 'TopList',
    component: TopList
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
