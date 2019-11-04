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
    return post('/s1/read/amark', {
      resource_type: 1,
      start_word: 0,
      resource_id,
      article_id,
      start_part,
      excerpt,
      percent,
    })
  },

  lmark(resource_id, page) {
    return post('/s1/read/lmark', {
      resource_id: resource_id,
      resource_type: 1,
      pagenum: page,
    })
  },

  rmark(mark_id, callback) {
    return post('/s1/read/rmark', {
      mark_id,
    })
  },
}
