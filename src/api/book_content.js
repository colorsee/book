import * as API from '../main'
import axios from 'axios'
import user from './user'
import handle from '../utils/handle'

var token = ''

export default {
  showart(resource_id) {
    //篇章阅读--加载内容
    return user
      .login()
      .then(token =>
        axios.post(
          '/index/read/showart',
          { resource_id },
          {
            headers: {
              Authorization: token,
            },
          }
        )
      )
      .then(handle)
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
    //保存会员阅读进度
    Axios.post(
      'https://result.eolinker.com/GzWguRJbc6216d987a858b371cd2e4973b84ea5ed45cb4e?uri=xxsy.1i2.cn/index/read/saveRstep',
      {
        resource_id: resource_id,
        resource_type: 1,
        rstep: rstep,
      }
    ).then(res => res.data)
  },
  show(resource_id, page, resource_type, callback) {
    //图书阅读--加载内容
    API.POST(
      'http://xxsy.1i2.cn/index/read/show',
      {
        resource_id: resource_id,
        resource_type: resource_type,
        page: page,
        callbacktype: 'jsonp',
        Authorization: token,
      },
      callback
    )
  },
  info(resource_id, callback) {
    //图书阅读--加载基础信息
    API.POST(
      'http://xxsy.1i2.cn/index/read/info',
      {
        resource_id: resource_id,
        callbacktype: 'jsonp',
      },
      callback
    )
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
