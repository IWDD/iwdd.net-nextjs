import { getTopics } from '../../lib/getTopics';

export default function RecentTopics() {
  const topics: string[] = getTopics();

  return (
    <section className="pt-10 pb-10">
      <h2 className="text-iwdd border-t border-t-gray-200 py-10">最近話題に出たキーワード</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium hover:bg-gray-300"
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}