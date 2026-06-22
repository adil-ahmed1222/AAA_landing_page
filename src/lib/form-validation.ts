export function validateName(name: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) return "Full name is required."
  if (trimmed.length < 3) return "Name must be at least 3 characters."
  return null
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) return "Email address is required."
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!pattern.test(trimmed)) return "Enter a valid email address."
  return null
}

export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return "Phone number is required."
  if (digits.length < 10) return "Phone number must be at least 10 digits."
  return null
}

export function validateRequired(value: string, label: string): string | null {
  if (!value.trim()) return `${label} is required.`
  return null
}

export function validateTerms(accepted: boolean): string | null {
  if (!accepted) return "You must accept the terms and conditions."
  return null
}
