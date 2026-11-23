export interface SeaReportListResponse {
  count: number
  page: number
  results: SeaReport[]
}

export interface SeaReport {
  id: number
  zoneId: number
  spotId: number
  spotName: string
  username: string
  date: string
  visibility: number
  waterTemperature: number
  windDirection: string
  waveHeight: number
  comment: string
  createdAt: string
}
