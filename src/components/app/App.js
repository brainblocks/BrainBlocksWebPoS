import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import Dashboard from 'components/dashboard/Dashboard'
import Calculator from 'components/calculator/Calculator'
import Modal from 'components/modal/Modal'

const Container = styled('div')`
  background: white;
  max-width: ${props => props.theme.bp.fullWidth}px;
  box-shadow: 10px 10px 120px rgba(0, 0, 0, 0.2);
  margin: auto;
  height: 100vh;
  width: 100%;
  position: relative;
  @media (min-height: ${props => props.theme.bp.fullHeight}px) {
    height: ${props => props.theme.bp.fullHeight}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

class App extends Component {
  state = {
    openPanel: 'dashboard',
    openModal: ''
  }

  handleOpenModal = modal => () => {
    this.setState({
      openModal: modal
    })
  }

  handleCloseModal = () => {
    this.setState({
      openModal: ''
    })
  }

  render() {
    return (
      <Container>
        {this.state.openPanel === 'dashboard' && (
          <Fragment>
            <Dashboard onOpenModal={this.handleOpenModal} />
            <Modal open={this.state.openModal === 'currency'} onClose={this.handleCloseModal}>
              Currency modal content
            </Modal>
            <Modal open={this.state.openModal === 'address'} onClose={this.handleCloseModal}>
              Address modal content
            </Modal>
          </Fragment>
        )}
        {this.state.openPanel === 'calculator' && <Calculator />}
      </Container>
    )
  }
}

export default App
