// @flow
import axios from 'axios'
import user from '../api/user'
import handle from './handle'

export function get(url: string) {
  return user
    .login()
    .then(({ token }) => axios.get(url, { headers: { Authorization: token } }))
    .then(handle)
}

export function post(url: string, data: any) {
  return user
    .login()
    .then(
      ({ token }) =>
        console.log(token) ||
        axios.post(url, data, { headers: { Authorization: token } })
    )
    .then(handle)
}
