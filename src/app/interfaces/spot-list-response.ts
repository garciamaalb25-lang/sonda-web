export interface SpotListResponse {
  count: number
  page: number
  results: Spot[]
}

export interface Spot {
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
}
