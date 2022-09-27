import type { MqFunctions, HandlerEvent } from './index.d'

export const runMqFunction = (mqf: MqFunctions, id: string): void => {
  if (!id) {
    throw new Error('required function id')
  }
  if (!mqf.functions.has(id)) {
    throw new Error(`${id} does not exist`)
  }

  const fn = mqf.functions.get(id)
  const _handleChange = (_mql: HandlerEvent): void => {
    if (typeof fn === 'function') {
      fn(_mql)
    }
  }

  _handleChange(mqf.mql)
}
