import type { MqFunctions, HandlerFunction, HandlerEvent } from './index.d'

export const createMqFunctions = (query: string): MqFunctions => {
  if (!query) {
    throw new Error('required query')
  }

  const functions = new Map<string, HandlerFunction>()

  return {
    functions,
    mql: window.matchMedia(query),
    _handleChange: (event: HandlerEvent): void => {
      if (functions.size <= 0) {
        return
      }

      for (const [, fn] of functions) {
        fn(event)
      }
    },
  }
}
