export type BrochureLeadPayload = {
  fullName: string
  email: string
  countryCode: string
  phone: string
  city: string
  qualification: string
  profession: string
  experienceLevel: string
  termsAccepted: boolean
}

export type EnrollLeadPayload = BrochureLeadPayload

export type LeadRecord = {
  type: "brochure" | "enroll"
  payload: BrochureLeadPayload | EnrollLeadPayload
  created_at?: string
}
