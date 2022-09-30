import type { MqFunctions, HandlerFunction } from './MqFunctions'
import { addEventListener, removeEventListener } from './utils/eventListener'

export const addMqFunction = (
  mqf: MqFunctions,
  id: string,
  fn: HandlerFunction,
): void => {
  if (!id) {
    throw new Error('required function id')
  }
  if (mqf.functions.has(id)) {
    throw new Error(`${id} has already been added`)
  }

  mqf.functions.set(id, fn)
  removeEventListener(mqf.mql, mqf._handleChange.bind(mqf))
  addEventListener(mqf.mql, mqf._handleChange.bind(mqf))
}
