import { sanitizeValString, convert } from './calculator'

test('sanitizeValString strips leading zero', () => {
  expect(sanitizeValString('0123')).toBe('123')
})
