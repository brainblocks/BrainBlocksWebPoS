/**
 * Currently this component requires that the brainblocks
 * script is already loaded and accessible via window.brainblocks
 */

import React, { Component } from 'react'

class BrainBlocksModule extends Component {
  componentDidMount = () => {
    window.brainblocks.Button.render(
      {
        style: {
          expanded: true
        },
        payment: {
          destination: this.props.address,
          currency: this.props.currency,
          amount: this.props.amount
        },
        onPayment: this.props.onPayment
      },
      '#payment-module'
    )
  }

  render() {
    return <div id="payment-module" />
  }
}

export default BrainBlocksModule
