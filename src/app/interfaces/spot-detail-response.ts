export interface SpotDetailResponse {
  id: number
  name: string
  zoneId: number
  zoneName: string
  latitude: number
  longitude: number
  bottomType: string
  minDepth: number
  maxDepth: number
  legalStatus: string
  validated: boolean
  accessType: string
  description: string
  species: string[]
  createdBy: string
  createdAt: string
}
