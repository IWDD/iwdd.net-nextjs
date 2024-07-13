import dayjs from 'dayjs'
import fs from 'fs'
import yaml from 'js-yaml'

import { type DataEvent, type DataEvents } from '@/types/DataEvents'

export const getNextEvent = async (): Promise<DataEvent | undefined> => {
  const file = fs.readFileSync('data.yml', 'utf8')
  const data = yaml.load(file) as DataEvents

  // Sort events by start_at date
  const sortedEvents = data?.events?.sort((a, b) =>
    dayjs(a.start_at).isAfter(dayjs(b.start_at)) ? 1 : -1,
  )

  // Find the next event that is not canceled and is in the future
  return sortedEvents?.find(
    (event) => !event.cancelled && dayjs(event.start_at).isAfter(dayjs()),
  )
}
