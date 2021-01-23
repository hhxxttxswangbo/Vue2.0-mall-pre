//网络4.导入request
import { request } from './request'

//网络5.导出getHomeMultidata
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
//导出getHomeGoods
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}