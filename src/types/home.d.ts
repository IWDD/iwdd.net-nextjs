export type HomeProps = {
  event: {
    title: string
    place: string
    date: string
    price: {
      adult: string
      student: string
    }
    themes: string[]
    event_url: string
  }
}
