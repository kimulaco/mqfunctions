/**
 * @jest-environment jsdom
 */
import MatchMediaMock from 'jest-matchmedia-mock'
import { createMqFunctions } from './createMqFunctions'
import { addMqFunction } from './addMqFunction'
import type { MqFunctions, HandlerEvent } from './index.d'

describe('resolve addMqFunctions', () => {
  let matchMedia: MatchMediaMock
  let mqf: MqFunctions

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
    mqf = createMqFunctions('(min-width: 769px)')
  })

  afterEach(() => {
    matchMedia.clear()
  })

  test('(min-width: 769px)', async () => {
    addMqFunction(mqf, 'test-01', (event: HandlerEvent) => {
      console.log(event)
    })

    expect(mqf.functions instanceof Map).toBeTruthy()
    expect(mqf.functions.size).toBe(1)
    expect(typeof mqf.functions.get('test-01')).toBe('function')
  })
})

describe('reject addMqFunctions', () => {
  let matchMedia: MatchMediaMock
  let mqf: MqFunctions

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
    mqf = createMqFunctions('(min-width: 769px)')
  })

  afterEach(() => {
    matchMedia.clear()
  })

  test('throw: required function id', () => {
    expect(() => {
      addMqFunction(mqf, '', () => {})
    }).toThrowError('required function id')
  })

  test('throw: already been added', () => {
    addMqFunction(mqf, 'test-01', () => {})

    expect(() => {
      addMqFunction(mqf, 'test-01', () => {})
    }).toThrowError('test-01 has already been added')
  })
})
