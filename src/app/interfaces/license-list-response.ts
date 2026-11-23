export interface LicenseListResponse {
  count: number
  page: number
  results: License[]
}

export interface License {
  id: number
  userId: number
  number: string
  type: string
  region: string
  issueDate: string
  expirationDate: string
  valid: boolean
}
