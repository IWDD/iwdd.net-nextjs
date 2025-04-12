import dayjs from 'dayjs'

import data from '@/data.json'
import type { DataEvent, DataEvents } from '@/types/DataEvents'

export const getNextEvent = async (): Promise<DataEvent | undefined> => {
  const parsedData = data as DataEvents

  // Sort events by start_at date
  const sortedEvents = parsedData?.events?.sort((a, b) =>
    dayjs(a.start_at).isAfter(dayjs(b.start_at)) ? 1 : -1,
  )

  // Find the next event that is not canceled and is in the future
  return sortedEvents?.find(
    (event) => !event.cancelled && dayjs(event.start_at).isAfter(dayjs()),
  )
}
