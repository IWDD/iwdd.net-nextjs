export type DataEvents = {
  events: DataEvent[]
}

export type DataEvent = {
  vol: number
  event_url: string
  start_at: string
  end_at: string
  place: string
  price: {
    general: number
    student: number
  }
  hash_tags: string[]
  topics: string[]
}
