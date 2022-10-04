/**
 * @jest-environment jsdom
 */
import MatchMediaMock from 'jest-matchmedia-mock'
import { createMqFunctions } from './createMqFunctions'
import { addMqFunction } from './addMqFunction'
import { runMqFunction } from './runMqFunction'
import type { MqFunctions, HandlerEvent } from './types/MqFunctions'

describe('resolve runMqFunction', () => {
  let matchMedia: MatchMediaMock
  let mqf: MqFunctions
  let testValues: { [key: string]: HandlerEvent } = {}

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
    mqf = createMqFunctions('(min-width: 769px)')
    testValues = {}
  })

  afterEach(() => {
    matchMedia.clear()
  })

  test('run added function', () => {
    mqf.functions.set('test1', (event: HandlerEvent) => {
      testValues.test1 = event
    })
    runMqFunction(mqf, 'test1')
    expect(testValues.test1?.matches).toBeFalsy()
    expect(testValues.test1?.media).toBe('(min-width: 769px)')
  })
})

describe('reject runMqFunction', () => {
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
      runMqFunction(mqf, '')
    }).toThrowError('required function id')
  })

  test('throw: does not exist', () => {
    addMqFunction(mqf, 'test-01', () => {})

    expect(() => {
      runMqFunction(mqf, 'test-02')
    }).toThrowError('test-02 does not exist')
  })
})
