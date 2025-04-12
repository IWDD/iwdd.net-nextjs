import { formatEventDate } from '@/lib/formatEventDate'
import type { DataEvent } from '@/types/DataEvents'
import type { HomeParams } from '@/types/HomeParams'

export const getHomeParams = (event: DataEvent | undefined): HomeParams => {
  if (!event) {
    return {
      event: {
        title: '次回のイベントは未定です',
        place: '未定',
        date: '未定',
        price: {
          general: 0,
          student: 0,
        },
        topics: ['未定'],
        event_url: '#',
      },
    }
  }
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
