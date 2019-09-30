// @flow
export default function throttle(fn: Function, delay: Number) {
  let prev = Date.now()

  return () => {
    const now = Date.now()
    if (now - prev > delay) {
      fn()
      prev = Date.now()
    }
  }
}
