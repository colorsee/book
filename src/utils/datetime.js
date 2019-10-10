// @flow
import dayjs from 'dayjs'

export default function datetime(date: string) {
  date = '' + date

  if (date.length < 13) {
    date += '000'
  }

  date = parseInt(date)
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
