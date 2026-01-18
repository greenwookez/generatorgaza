export const validateSlug = (value: string | null | undefined) => {
  if (!value) return 'Это обязательное поле.'

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  if (!slugRegex.test(value)) {
    return 'Slug должен содержать только латинские строчные буквы, цифры и дефисы (например, my-page-123).'
  }

  return true
}
