import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

type Event = {
  topics?: string[];
};

type Data = {
  events?: Event[];
};

export function getTopics(): string[] {
  const filePath = path.join(process.cwd(), 'data.yml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents) as Data;

  return (data.events || [])
    .flatMap(event => event.topics || [])
    .filter((topic, index, self) => topic !== '募集中' && self.indexOf(topic) === index);
}