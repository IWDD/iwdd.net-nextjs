import type { DataEvent } from '@/types/DataEvents'

export type HomeParams = {
  event: {
    title: string
    place: DataEvent['place']
    date: string
    price: {
      general: DataEvent['price']['general']
      student: DataEvent['price']['student']
    }
    topics: DataEvent['topics']
    event_url: DataEvent['event_url']
  }
}
