'use server'

import { getTopics } from '@/lib/getTopics'

export default async function RecentTopics() {
  const topics = await getTopics()

  return (
    <>
      <h2 className={'mb-10 text-xl text-iwdd'}>最近話題に出たキーワード</h2>
      <div className={'flex flex-row flex-wrap justify-center gap-2 px-1'}>
        {topics.map((topic, index) => (
          <span
            key={index}
            className={
              'rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-800 hover:bg-gray-300'
            }
          >
            {topic}
          </span>
        ))}
      </div>
    </>
  )
}
