export interface ForecastListResponse {
  count: number
  page: number
  results: Forecast[]
}

export interface Forecast {
  id: number
  zoneId: number
  zoneName: string
  date: string
  visibility: number
  visibilityLevel: string
  windSpeed: number
  windDirection: string
  suitable: boolean
}
