import dayjs from 'dayjs'
import fs from 'fs'
import yaml from 'js-yaml'

import { type ConnpassEvent, type ConnpassEvents } from '@/types/connpass'

export const getNextConnpassEvent = async (): Promise<ConnpassEvent> => {
  const file = fs.readFileSync('data.yml', 'utf8')
  const data = yaml.load(file) as ConnpassEvents

  let event: ConnpassEvent = data.events[0]

  let targetMonth = dayjs()
  for (let i = 0; i < 5; i++) {
    event = data.events[i]
    if (dayjs(data.events[i].started_at).isAfter(dayjs())) {
      break
    }
    targetMonth = targetMonth.add(1, 'month')
  }

  return event
}
