export interface ZoneListResponse {
  count: number
  page: number
  results: Zone[]
}

export interface Zone {
  id: number
  name: string
  province: string
  latitude: number
  longitude: number
}
