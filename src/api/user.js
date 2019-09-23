import { jsonp } from 'vue'

let token = localStorage.getItem('token')

export default {
  login(username, password) {
    if (token) {
      return Promise.resolve(token)
    }

    return jsonp('http://xxsy.1i2.cn/index/member/login', {
      account: username,
      password: password,
      callbacktype: 'jsonp',
    }).then(data => {
      if (data.code != 1) {
        throw new Error(data.msg)
      }

      localStorage.setItem('token', data.posts)
      localStorage.setItem('timestamp', Date.now())

      return (token = data.posts)
    })
  },
}
