// @flow
export default function flat(arr: any[]) {
  return arr.reduce((sum, cur) => {
    if (Array.isArray(cur)) {
      return [...sum, ...flat(cur)]
    }
    return [...sum, cur]
  }, [])
}
