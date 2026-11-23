export interface MeetupDetailResponse {
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
  organizerId: number
  meetingPoint: string
  description: string
  participants: Participant[]
  createdAt: string
}

export interface Participant {
  userId: number
  username: string
  experienceLevel: string
}
