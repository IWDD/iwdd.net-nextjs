import data from '@/data.json'
import { DataEvents } from '@/types/DataEvents'

// トピックスを取得する関数
export const getTopics = async (): Promise<string[]> => {
  const parsedData = data as DataEvents

  // トピックスを抽出するロジック
  return extractUniqueTopics(parsedData)
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
