import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export const formatEventDate = (dateString: string, formatString: string) => {
  const date = dayjs(dateString).tz('Asia/Tokyo')
  return date.format(formatString)
}
