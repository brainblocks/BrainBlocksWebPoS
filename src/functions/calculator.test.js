import { sanitizeValString, convert } from './calculator'

/**
 * sanitizeValString
 */
describe('santizeValString tests', () => {
  test('strips leading zero', () => {
    expect(sanitizeValString('0123')).toBe('123')
  })

  test("doesn't strip last leading zero of decimal", () => {
    expect(sanitizeValString('00.123')).toBe('0.123')
  })

  test('converts empty to zero', () => {
    expect(sanitizeValString('')).toBe('0')
  })

  test('leaves properly formatted value untouched', () => {
    expect(sanitizeValString('123.456')).toBe('123.456')
  })

  test('adds leading zero to number starting with decimal', () => {
    expect(sanitizeValString('.34')).toBe('0.34')
  })
})

/**
 * convert
 */
describe('converter tests', () => {
  test('works from nano to fiat', () => {
    expect(convert(1, 'nano', 2.5)).toBe(2.5)
  })

  test('works from fiat to nano', () => {
    expect(convert(2.5, 'fiat', 2.5)).toBe(1)
  })

  test('zero/empty/null/undefined price returns zero', () => {
    expect(convert(1, 'fiat')).toBe(0)
    expect(convert(1, 'fiat', 0)).toBe(0)
    expect(convert(1, 'fiat', null)).toBe(0)
  })
})
