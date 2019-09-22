// @flow
import dayjs from 'dayjs'

export default function datetime(date: string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
