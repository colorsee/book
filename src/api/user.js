import { jsonp } from 'vue'

let user = null

export default {
  login(username, password) {
    if (user instanceof Promise) {
      return user
    }

    if (user) {
      return Promise.resolve(user)
    }

    user = jsonp('http://xxsy.1i2.cn/index/member/login', {
      account: username,
      password: password,
      callbacktype: 'jsonp',
    }).then(data => {
      if (data.code != 1) {
        throw new Error(data.msg)
      }

      return (user = {
        token: data.posts,
        member_id: 1,
      })
    })

    return user
  },
}
