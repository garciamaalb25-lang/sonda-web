export interface UserListResponse {
  count: number
  page: number
  results: User[]
}

export interface User {
  id: number
  username: string
  email: string
  experienceLevel: string
  role: string
  status: string
  createdAt: string
}
