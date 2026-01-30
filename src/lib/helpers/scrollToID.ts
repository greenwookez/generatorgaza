/**
 * Smoothly scrolls the window to the element with the specified ID.
 *
 * @param id - The ID of the target element to scroll to.
 * @param offset - Optional. The number of pixels to offset from the top of the element.
 *
 * If the element is found, the window will scroll smoothly to its position,
 * adjusted by the given offset (if provided).
 */
export function scrollToID(id: string, offset?: number) {
  const element = document.getElementById(id)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - (offset ?? 0)

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
