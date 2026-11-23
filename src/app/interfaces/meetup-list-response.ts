export interface MeetupListResponse {
  count: number
  page: number
  results: Meetup[]
}

export interface Meetup {
  id: number
  title: string
  spotId: number
  spotName: string
  zoneName: string
  dateTime: string
  maxParticipants: number
  currentParticipants: number
  minLevel: string
  status: string
  organizer: string
}
