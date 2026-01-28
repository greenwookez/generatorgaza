import { useReducer, useRef } from 'react'

export default function useSimpleError<ERR extends string, VAL = boolean>(
  _?: ERR[],
): [
  (err?: ERR) => VAL | undefined | boolean,
  (err: ERR, val: VAL | false) => Partial<Record<ERR, VAL>>,
] {
  const errs = useRef<Partial<Record<ERR, VAL>>>({})
  const [, forceUpdate] = useReducer((x) => (x > 100 ? 0 : x + 1), 0)

  function has(err?: ERR): VAL | undefined | boolean {
    if (err) {
      return errs.current[err]
    }

    return Object.keys(errs.current).length > 0
  }

  function set(err: ERR, val: VAL | false): Partial<Record<ERR, VAL>> {
    const hasErr = has(err)
    if (hasErr && (typeof val === 'undefined' || val === false)) {
      delete errs.current[err]
      forceUpdate()
    } else if (!hasErr && typeof val !== 'undefined' && val !== false) {
      errs.current[err] = val
      forceUpdate()
    }

    return errs.current
  }

  return [has, set]
}
