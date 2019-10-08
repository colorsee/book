import axios from 'axios'
import handle from '../utils/handle'

let user = null

export default {
  login(username, password) {
    if (user instanceof Promise) {
      return user
    }

    if (user) {
      return Promise.resolve(user)
    }

    user = axios
      .post('/index/member/login', {
        account: username,
        password: password,
        callbacktype: 'json',
      })
      .then(handle)
      .then(data => {
        return (user = {
          token: data.posts,
          member_id: 1,
        })
      })

    return user
  },
}
