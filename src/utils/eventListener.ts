export const addEventListener = (
  mql: MediaQueryList,
  handler: (event: MediaQueryListEvent) => void,
) => {
  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', handler)
    return
  }
  // Fallback for legacy browser
  mql.addListener(handler)
}

export const removeEventListener = (
  mql: MediaQueryList,
  handler: (event: MediaQueryListEvent) => void,
) => {
  if (typeof mql.addEventListener === 'function') {
    mql.removeEventListener('change', handler)
  }
  // Fallback for legacy browser
  mql.removeListener(handler)
}
