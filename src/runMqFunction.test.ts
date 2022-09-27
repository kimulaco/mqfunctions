/**
 * @jest-environment jsdom
 */
import MatchMediaMock from 'jest-matchmedia-mock'
import { createMqFunctions } from './createMqFunctions'
import { addMqFunction } from './addMqFunction'
import { runMqFunction } from './runMqFunction'
import type { MqFunctions } from './index.d'

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
