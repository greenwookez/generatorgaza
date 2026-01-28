/**
 * Checks if the provided string is a valid email address.
 *
 * Uses a regular expression to verify that the input follows a basic email format:
 * - Contains characters before and after the "@" symbol
 * - Contains at least one "." after the "@" symbol
 * - Does not contain whitespace characters
 *
 * @param email - The email address string to validate.
 * @returns `true` if the input is a valid email address, otherwise `false`.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63}$/
  return emailRegex.test(email)
}
