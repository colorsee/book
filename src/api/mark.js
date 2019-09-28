// @flow
import * as API from '../main'
var token = ''
let user = JSON.parse(localStorage.getItem('access-user'))
if (user) {
  token = user.token
}

import { post } from '../utils/request'

export default {
  amark({ resource_id, article_id, start_part, start_word, excerpt, percent }) {
    return post('/index/read/amark', {
      resource_type: 1,
      resource_id,
      start_word,
      article_id,
      start_part,
      excerpt,
      percent,
    })
  },

  lmark(resource_id, page) {
    return post('/index/read/lmark', {
      resource_id: resource_id,
      resource_type: 1,
      pagenum: page,
    })
  },

  rmark(mark_id, callback) {
    API.POST(
      'http://xxsy.1i2.cn/index/read/rmark',
      { mark_id, Authorization: token, callbacktype: 'jsonp' },
      callback
    )
  },
}
