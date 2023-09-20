import dayjs from 'dayjs'

import { type ConnpassEvent, type ConnpassEvents } from '@/types/connpass'

export const getNextConnpassEvent = async (): Promise<ConnpassEvent> => {
  let event: ConnpassEvent = {
    event_id: 0,
    title: '次回の勉強会は未定です',
    catch: '',
    description:
      '<p>Webに関連する最先端のデザイン系＆技術系な話題をするIT勉強会です。  </p>\n<p>この話したい！この悩みを解決させたい！など大募集！</p>\n<p>その他、突発的なネタ提供も大歓迎！  </p>\n<h2>予習してくるとお悩み共有・解決できるかも。(たまに追記)</h2>\n<ul>\n<li>募集中</li>\n</ul>',
    event_url: 'https://iwdd.net',
    started_at: '未定',
    ended_at: '未定',
    limit: null,
    hash_tag: 'iwdd',
    event_type: 'participation',
    accepted: 1,
    waiting: 0,
    updated_at: '2099-01-01T00:00:00+09:00',
    owner_id: 105582,
    owner_nickname: 'iwdd',
    owner_display_name: 'iwdd',
    place: 'アイーナ 816部屋',
    address: '岩手県盛岡市盛岡駅西通1丁目7番1号',
    lat: '39.701927700000',
    lon: '141.132745400000',
    series: {
      id: 2772,
      title: 'iwdd',
      url: 'https://iwdd.connpass.com/',
    },
  }

  let targetMonth = dayjs()
  for (let i = 0; i < 5; i++) {
    const res = await fetch(
      `https://connpass.com/api/v1/event/?series_id=2772&ym=${targetMonth.format(
        'YYYYMM',
      )}`,
    )
    const data: ConnpassEvents = await res.json()
    event = data.events[0]
    if (dayjs(data.events[0].started_at).isAfter(dayjs())) {
      break
    }
    targetMonth = targetMonth.add(1, 'month')
  }

  return event
}
