'use server'

import { getTopics } from '@/lib/getTopics'

export default async function RecentTopics() {
  const topics = await getTopics()

  return (
    <section className="pt-10 pb-10">
      <h2 className="border-t border-t-gray-200 py-10 text-iwdd">
        最近の勉強会の内容
      </h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300"
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  )
}
