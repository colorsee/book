import * as API from '../main'
import { post } from '../utils/request'
import Section from '../models/Section'
import flat from '../utils/flat'

export default {
  showart(resource_id) {
    return post('/index/read/showart', { resource_id })
  },
  rstep(resource_id) {
    //查询会员阅读进度
    Axios.post(
      'https://result.eolinker.com/GzWguRJbc6216d987a858b371cd2e4973b84ea5ed45cb4e?uri=xxsy.1i2.cn/index/read/rstep',
      {
        resource_id: resource_id,
        resource_type: 1,
      }
    ).then(res => data.res)
  },
  saveRstep(resource_id, rstep) {
    return post('/index/read/saveRstep', {
      resource_id: resource_id,
      resource_type: 1,
      rstep: rstep,
    }).then(res => res.data)
  },
  show(resource_id) {
    return post('/index/read/show', {
      resource_id,
      resource_type: 1,
      page: 1,
    }).then(({ posts }) => flat(posts.map(i => Section.list(i))))
  },
  info(resource_id) {
    //图书阅读--加载基础信息
    return post('/index/read/info', {
      resource_id,
    })
  },
  article(resource_id, callback) {
    //篇章阅读--加载基础信息
    API.POST(
      'http://xxsy.1i2.cn/index/read/article',
      {
        resource_id: resource_id,
        callbacktype: 'jsonp',
        Authorization: token,
      },
      callback
    )
  },
  probation(resource_id, resource_type, callback) {
    //加载试读数据
    API.POST(
      'http://xxsy.1i2.cn/index/read/probation',
      {
        resource_id: resource_id,
        resource_type: resource_type,
        callbacktype: 'jsonp',
      },
      callback
    )
  },
}
