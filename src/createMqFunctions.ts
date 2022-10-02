import type {
  MqFunctions,
  HandlerFunction,
  HandlerEvent,
} from './types/MqFunctions'
import { addMqFunction } from './addMqFunction'
import { removeMqFunction } from './removeMqFunction'
import { runMqFunction } from './runMqFunction'

export const createMqFunctions = (query: string): MqFunctions => {
  if (!query) {
    throw new Error('required query')
  }

  const functions = new Map<string, HandlerFunction>()

  const mqf: MqFunctions = {
    functions,

    mql: window.matchMedia(query),

    add(id: string, fn: HandlerFunction) {
      addMqFunction(mqf, id, fn)
    },

    remove(id: string) {
      removeMqFunction(mqf, id)
    },

    run(id: string) {
      runMqFunction(mqf, id)
    },

    _handleChange: (event: HandlerEvent): void => {
      if (functions.size <= 0) {
        return
      }

      for (const [, fn] of functions) {
        fn(event)
      }
    },
  }

  return mqf
}
