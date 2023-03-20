export type ConnpassEvents = {
  results_start: number
  results_returned: number
  results_available: number
  events: ConnpassEvent[]
}

export type ConnpassEvent = {
  event_id: number
  title: string
  catch: strin
  description: string
  event_url: string
  started_at: string
  ended_at: string
  limit: null
  hash_tag: string
  event_type: string
  accepted: number
  waiting: number
  updated_at: string
  owner_id: number
  owner_nickname: string
  owner_display_name: string
  place: string
  address: string
  lat: string
  lon: string
  series: {
    id: number
    title: string
    url: string
  }
}
