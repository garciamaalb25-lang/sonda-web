export interface AdListResponse {
  count: number
  page: number
  results: Ad[]
}

export interface Ad {
  id: number
  title: string
  category: string
  price: number
  condition: string
  city: string
  mainPhotoUrl: string
  status: string
  createdAt: string
}
