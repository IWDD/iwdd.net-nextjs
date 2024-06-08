export type DataEvents = {
  events: DataEvent[]
}

export type DataEvent = {
  event_id: number
  title: string
  description: string
  topics: string[]
  event_url: string
  start_at: string
  end_at: string
  hash_tag: string
  place: string
  address: string
  lat: string
  lon: string
}
