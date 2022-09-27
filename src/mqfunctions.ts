import { addEventListener, removeEventListener } from './utils/eventListener'

export type HandlerEvent = {
  readonly matches: boolean
  readonly media: string
}

export type HandlerFunction = (event: HandlerEvent) => void

export type MqFunctions = {
  functions: Map<string, HandlerFunction>
  readonly mql: MediaQueryList
  readonly _handleChange: (event: HandlerEvent) => void
}

export const createMqFunctions = (query: string): MqFunctions => {
  if (!query) {
    throw new Error('required query.')
  }

  const functions = new Map<string, HandlerFunction>()

  return {
    functions,
    mql: window.matchMedia(query),
    _handleChange: (event: HandlerEvent): void => {
      if (functions.size <= 0) {
        return
      }

      for (const [_, fn] of functions) {
        fn(event)
      }
    },
  }
}

export const addMqFunction = (
  mqf: MqFunctions,
  id: string,
  fn: HandlerFunction,
): void => {
  if (mqf.functions.has(id)) {
    throw new Error(`${id} has already been added.`)
  }

  mqf.functions.set(id, fn)
  removeEventListener(mqf.mql, mqf._handleChange.bind(mqf))
  addEventListener(mqf.mql, mqf._handleChange.bind(mqf))
}

export const removeMqFunction = (
  mqf: MqFunctions,
  id: string,
): void => {
  if (!mqf.functions.has(id)) {
    throw new Error(`${id} does not exist.`)
  }

  mqf.functions.delete(id)
  removeEventListener(mqf.mql, mqf._handleChange.bind(mqf))
  addEventListener(mqf.mql, mqf._handleChange.bind(mqf))
}

export const runMqFunction = (
  mqf: MqFunctions,
  id: string,
): void => {
  if (!mqf.functions.has(id)) {
    throw new Error(`${id} does not exist.`)
  }

  const fn = mqf.functions.get(id)
  const _handleChange = (_mql: HandlerEvent): void => {
    if (typeof fn === 'function') {
      fn(_mql)
    }
  }

  _handleChange(mqf.mql)
}
