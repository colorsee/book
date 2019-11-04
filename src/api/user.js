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
      .post('/s1/member/login', {
        account: username,
        password: password,
        callbacktype: 'json',
      })
      .then(handle)
      .then(data => {
        return (user = data.posts)
      })

    return user
  },
}
