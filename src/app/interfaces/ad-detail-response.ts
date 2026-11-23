export interface AdDetailResponse {
  id: number
  title: string
  category: string
  price: number
  condition: string
  city: string
  mainPhotoUrl: string
  status: string
  createdAt: string
  description: string
  brand: string
  photos: string[]
  seller: Seller
}

export interface Seller {
  id: number
  username: string
  city: string
}
