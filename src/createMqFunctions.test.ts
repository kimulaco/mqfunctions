/**
 * @jest-environment jsdom
 */
import MatchMediaMock from 'jest-matchmedia-mock'
import { createMqFunctions } from './createMqFunctions'
import type { HandlerEvent } from './types/MqFunctions'

describe('resolve createMqFunctions', () => {
  let matchMedia: MatchMediaMock
  let testValues: { [key: string]: HandlerEvent } = {}

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
    testValues = {}
  })

  afterEach(() => {
    matchMedia.clear()
  })

  test('(min-width: 769px)', async () => {
    const mqf = createMqFunctions('(min-width: 769px)')

    // default internal values
    expect(mqf.functions instanceof Map).toBeTruthy()
    expect(mqf.functions.size).toBe(0)
    expect(mqf.mql.matches).toBeFalsy()
    expect(mqf.mql.media).toBe('(min-width: 769px)')

    // _handleChange() is resolve also when no functions
    expect(() => {
      mqf._handleChange({
        matches: false,
        media: '(min-width: 769px)',
      })
    }).not.toThrow()

    // run added functions
    mqf.functions.set('test1', (event: HandlerEvent) => {
      testValues.test1 = event
    })
    mqf.functions.set('test2', (event: HandlerEvent) => {
      testValues.test2 = event
    })
    mqf._handleChange({
      matches: false,
      media: '(min-width: 769px)',
    })
    expect(testValues.test1?.matches).toBeFalsy()
    expect(testValues.test1?.media).toBe('(min-width: 769px)')
    expect(testValues.test2?.matches).toBeFalsy()
    expect(testValues.test2?.media).toBe('(min-width: 769px)')
  })

  test('.add()', async () => {
    const mqf = createMqFunctions('(min-width: 769px)')

    mqf.add('test1', () => {})
    expect(mqf.functions.size).toBe(1)
  })

  test('.remove()', async () => {
    const mqf = createMqFunctions('(min-width: 769px)')

    mqf.add('test1', () => {})
    expect(mqf.functions.size).toBe(1)
    mqf.remove('test1')
    expect(mqf.functions.size).toBe(0)
  })

  test('.run()', async () => {
    let testValues: { [key: string]: HandlerEvent } = {}
    const mqf = createMqFunctions('(min-width: 769px)')

    mqf.add('test1', (event: HandlerEvent) => {
      testValues.test1 = event
    })

    expect(testValues.test1).toBeUndefined()
    mqf.run('test1')
    expect(testValues.test1?.matches).toBeFalsy()
    expect(testValues.test1?.media).toBe('(min-width: 769px)')
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
