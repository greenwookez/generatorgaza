let isLocalStorageAvil: boolean | undefined = undefined

/**
 * Checks if the browser's `localStorage` is available and functional.
 *
 * This function attempts to set and retrieve a test value in `localStorage` to verify
 * its availability. It caches the result in a global variable for subsequent calls.
 *
 * @returns {boolean} `true` if `localStorage` is available and functional, otherwise `false`.
 */
export default function IsLocalStorageAvailable() {
  if (typeof isLocalStorageAvil !== 'undefined') {
    return isLocalStorageAvil
  }

  try {
    localStorage.setItem('test', 'test')
    if (localStorage.getItem('test') !== 'test') {
      isLocalStorageAvil = false
      return false
    }
    localStorage.removeItem('test')
    isLocalStorageAvil = true
    return true
  } catch (e) {
    isLocalStorageAvil = false
    return false
  }
}
