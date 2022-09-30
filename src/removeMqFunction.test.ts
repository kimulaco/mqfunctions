/**
 * @jest-environment jsdom
 */
import MatchMediaMock from 'jest-matchmedia-mock'
import { createMqFunctions } from './createMqFunctions'
import { addMqFunction } from './addMqFunction'
import { removeMqFunction } from './removeMqFunction'
import type { MqFunctions, HandlerEvent } from './MqFunctions'

describe('resolve removeMqFunction', () => {
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
    addMqFunction(mqf, 'test-02', (event: HandlerEvent) => {
      console.log(event)
    })

    expect(mqf.functions instanceof Map).toBeTruthy()
    expect(mqf.functions.size).toBe(2)
    expect(mqf.functions.has('test-01')).toBeTruthy()

    removeMqFunction(mqf, 'test-01')

    expect(mqf.functions.size).toBe(1)
    expect(mqf.functions.has('test-01')).toBeFalsy()
  })
})

describe('reject removeMqFunction', () => {
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
      removeMqFunction(mqf, '')
    }).toThrowError('required function id')
  })

  test('throw: does not exist', () => {
    addMqFunction(mqf, 'test-01', () => {})

    expect(() => {
      removeMqFunction(mqf, 'test-02')
    }).toThrowError('test-02 does not exist')
  })
})
