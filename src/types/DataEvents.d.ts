export type DataEvents = {
  events: DataEvent[]
}

export type DataEvent = {
  event_id: number
  title: string
  description: string
  event_url: string
  started_at: string
  ended_at: string
  hash_tag: string
  place: string
  address: string
  lat: string
  lon: string
}
