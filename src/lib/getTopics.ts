import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

type Event = {
  topics?: string[]
  start_at?: string
}

type Data = {
  events?: Event[]
}

export function getTopics(): string[] {
  const filePath = path.join(process.cwd(), 'data.yml')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = yaml.load(fileContents) as Data

  return (data.events || [])
    .filter((event) => event.start_at) // Ensure events have a start date
    .sort(
      (a, b) =>
        new Date(b.start_at!).getTime() - new Date(a.start_at!).getTime(),
    ) // Sort by start date descending
    .flatMap((event) => event.topics || [])
    .filter(
      (topic, index, self) =>
        topic !== '募集中' && self.indexOf(topic) === index,
    )
}
