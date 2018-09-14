import { currencyToNanoViaUSD } from './nano'

/**
 * currencyToNanoViaUSD
 */
describe('currencyToNanoViaUSD tests', () => {
  test('gives correct result', () => {
    expect(currencyToNanoViaUSD(2, 1000000)).toBe(0.5)
  })
})
