// @flow
import url from 'url'

export default function query() {
  const locationURL = url.parse(window.location.href, true)
  return locationURL.query
}
