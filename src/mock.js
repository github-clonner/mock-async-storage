/* global jest */

import AsyncStorageMock from './AsyncStorageMock'

export const mock = () => {
  const mockImpl = new AsyncStorageMock()
  jest.mock('AsyncStorage', () => mockImpl)
  return mockImpl
}

export const release = () => jest.unmock('AsyncStorage')
