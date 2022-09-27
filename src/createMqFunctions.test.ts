/**
 * @jest-environment jsdom
 */
import MatchMediaMock from 'jest-matchmedia-mock'
import { createMqFunctions } from './createMqFunctions'
import type { MqFunctions, HandlerEvent } from './index.d'

const getHandleArg = (mqf: MqFunctions): Promise<HandlerEvent> => {
  return new Promise((resolve, reject) => {
    mqf.functions.set('test', (event: HandlerEvent) => {
      resolve(event)
    })
    const fn = mqf.functions.get('test')
    if (typeof fn === 'function') {
      fn(mqf.mql)
    } else {
      reject('undefined function')
    }
  })
}

describe('resolve createMqFunctions', () => {
  let matchMedia: MatchMediaMock

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    matchMedia.clear()
  })

  test('(min-width: 769px)', async () => {
    const mqf = createMqFunctions('(min-width: 769px)')

    expect(mqf.functions instanceof Map).toBeTruthy()
    expect(mqf.functions.size).toBe(0)

    expect(mqf.mql.matches).toBeFalsy()
    expect(mqf.mql.media).toBe('(min-width: 769px)')

    const handlerArg = await getHandleArg(mqf)

    expect(handlerArg.matches).toBeFalsy()
    expect(handlerArg.media).toBe('(min-width: 769px)')
  })
})

describe('reject createMqFunctions', () => {
  let matchMedia: MatchMediaMock

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    matchMedia.clear()
  })

  test('throw: required query', () => {
    expect(() => {
      createMqFunctions('')
    }).toThrowError('required query')
  })
})
