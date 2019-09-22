import * as API from '../main'
var token = ''
let user = JSON.parse(localStorage.getItem('access-user'))
if (user) {
  token = user.token
}
export default {
  amark() {
    Axios.post('')
  },

  lmark(resource_id, page, callback) {
    API.POST(
      'http://xxsy.1i2.cn/index/read/lmark',
      {
        resource_id: resource_id,
        resource_type: 1,
        pagenum: page,
        callbacktype: 'jsonp',
        Authorization: token,
      },
      callback
    )
  },

  rmark(mark_id, callback) {
    API.POST(
      'http://xxsy.1i2.cn/index/read/rmark',
      { mark_id, Authorization: token, callbacktype: 'jsonp' },
      callback
    )
  },
}
