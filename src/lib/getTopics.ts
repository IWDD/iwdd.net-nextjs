import data from '@/data.json'
import type { DataEvents } from '@/types/DataEvents'

export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function getTopicsFromEvents(events: DataEvents['events']): string[] {
  return (events || [])
    .filter((event) => event.start_at)
    .sort(
      (a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime(),
    )
    .flatMap((event) => shuffle(event.topics || []))
    .filter(
      (topic, index, self) =>
        topic !== '募集中' && self.indexOf(topic) === index,
    )
}

// トピックスを取得する関数
export const getTopics = async (): Promise<string[]> => {
  const parsedData = data as DataEvents
  return getTopicsFromEvents(parsedData.events)
}
