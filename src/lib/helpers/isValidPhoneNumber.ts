/**
 * Validates whether a given string matches the Russian +7 phone number format "+7 (XXX) XXX-XX-XX".
 * @param phone - The phone number string to validate.
 * @returns True if the phone number matches the expected format; otherwise, false.
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
  return phoneRegex.test(phone)
}
