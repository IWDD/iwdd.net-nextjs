import { DataEvent } from '@/types/DataEvents'

export type HomeParams = {
  event: {
    title: string
    place: DataEvent['place']
    date: string
    price: {
      adult: string
      student: string
    }
    topics: DataEvent['topics']
    event_url: DataEvent['event_url']
  }
}
