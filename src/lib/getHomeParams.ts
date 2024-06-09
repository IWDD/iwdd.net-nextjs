import { formatEventDate } from '@/lib/formatEventDate'
import { type DataEvent } from '@/types/DataEvents'
import { type HomeParams } from '@/types/HomeParams'

export const getHomeParams = (event: DataEvent): HomeParams => {
  return {
    event: {
      title: `IWDD (vol.${event.vol})`,
      place: event.place,
      date: `${formatEventDate(event.start_at, 'YYYY.MM.DD HH:mm')} - ${formatEventDate(event.end_at, 'HH:mm')}`,
      price: {
        general: event.price.general,
        student: event.price.student,
      },
      topics: event.topics,
      event_url: event.event_url,
    },
  }
}
