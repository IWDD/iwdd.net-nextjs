import fs from 'fs/promises'
import yaml from 'js-yaml'
import path from 'path'

import { DataEvents } from '@/types/DataEvents'

// トピックスを取得する関数
export const getTopics = async (): Promise<string[]> => {
  const filePath = path.join(process.cwd(), 'data.yml')

  // 非同期でファイルを読み込む
  let fileContents: string
  try {
    fileContents = await fs.readFile(filePath, 'utf8')
  } catch (error) {
    console.error('Error reading data.yml:', error)
    return []
  }

  // YAML をパースして型チェック
  let data: DataEvents
  try {
    data = yaml.load(fileContents) as DataEvents
  } catch (error) {
    console.error('Error parsing YAML:', error)
    return []
  }

  // トピックスを抽出するロジック
  return extractUniqueTopics(data)
}

// ユニークなトピックスを抽出するヘルパー関数
function extractUniqueTopics(data: DataEvents): string[] {
  return (data.events || [])
    .filter((event) => event.start_at) // 開始日が存在するイベントのみ
    .sort(
      (a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime(),
    ) // 開始日の降順でソート
    .flatMap((event) => event.topics || []) // トピックスを展開
    .filter(
      (topic, index, self) =>
        topic !== '募集中' && self.indexOf(topic) === index,
    ) // ユニークかつ「募集中」を除外
}
