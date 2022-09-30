import type { MqFunctions } from './types/MqFunctions'
import { addEventListener, removeEventListener } from './utils/eventListener'

export const removeMqFunction = (mqf: MqFunctions, id: string): void => {
  if (!id) {
    throw new Error('required function id')
  }
  if (!mqf.functions.has(id)) {
    throw new Error(`${id} does not exist`)
  }

  mqf.functions.delete(id)
  removeEventListener(mqf.mql, mqf._handleChange.bind(mqf))
  addEventListener(mqf.mql, mqf._handleChange.bind(mqf))
}
