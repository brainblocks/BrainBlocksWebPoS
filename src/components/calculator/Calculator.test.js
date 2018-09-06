import React from 'react'
import { shallow } from 'enzyme'
import Calculator from './Calculator'

describe('Calculator component conversions', () => {
  const wrapper = shallow(
    <Calculator currencyCode="USD" currencySymbol="$" currencyNanoPrice={2.5} onBack={() => {}} />
  )
  const instance = wrapper.instance()
  it('should convert from Fiat to Nano correctly', () => {
    expect(wrapper.state('amountFiat')).toBe('0')
    expect(wrapper.state('amountNano')).toBe('0')
    expect(wrapper.state('editing')).toBe('amountFiat')
    wrapper.find('#key-1').simulate('click')
    expect(wrapper.state('amountFiat')).toBe('1')
    expect(wrapper.state('amountNano')).toBe('0.4')
    expect(wrapper.state('editing')).toBe('amountFiat')
  })
  it('should clear correctly', () => {
    wrapper.find('#key-clear').simulate('click')
    expect(wrapper.state('amountFiat')).toBe('0')
    expect(wrapper.state('amountNano')).toBe('0')
  })
  it('should switch correctly', () => {
    wrapper.find('#key-switch').simulate('click')
    expect(wrapper.state('editing')).toBe('amountNano')
  })
  it('should convert from Nano to Fiat correctly', () => {
    wrapper.find('#key-1').simulate('click')
    expect(wrapper.state('amountFiat')).toBe('2.5')
    expect(wrapper.state('amountNano')).toBe('1')
  })
})
