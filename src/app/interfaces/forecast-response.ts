export interface ForecastResponse {
  id: number
  zoneId: number
  zoneName: string
  date: string
  visibility: number
  visibilityLevel: string
  waterTemperature: number
  airTemperature: number
  windSpeed: number
  windDirection: string
  waveHeight: number
  suitable: boolean
  tides: Tide[]
}

export interface Tide {
  type: string
  time: string
  height: number
}
