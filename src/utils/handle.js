// @flow
export default function handle(resp) {
  const { code, msg, ...data } = resp.data

  if (code !== 1) {
    console.log(code)
    alt_page(msg)
    throw new Error(msg)
  }

  return data
}
