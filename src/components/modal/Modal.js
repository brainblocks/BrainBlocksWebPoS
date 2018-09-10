import React from 'react'
import { css } from 'react-emotion'
import OutsideClickHandler from 'react-outside-click-handler'
import CloseIcon from 'mdi-react/CloseIcon'
import theme from 'theme'

const getStyles = props => {
  const modal = css`
    position: fixed;
    background: #fff;
    box-shadow: 10px 10px 120px rgba(0, 0, 0, 0.2);
    /* Sizing */
    top: 70px;
    left: ${theme.spacing.mobile.dashPadding}px;
    right: ${theme.spacing.mobile.dashPadding}px;
    height: calc(100vh - 70px - 20px);
    @media (min-width: ${theme.bp.tablet}px) {
      top: 130px;
      left: ${theme.spacing.tablet.dashPadding}px;
      right: ${theme.spacing.tablet.dashPadding}px;
      height: calc(100vh - 130px - 30px);
    }
    @media (min-width: ${theme.bp.desktop}px) {
      top: 50%;
      left: 50%;
      right: auto;
      width: ${theme.bp.fullWidth - theme.spacing.desktop.dashPadding * 2}px;
      transform: translate(-50%, -50%);
      height: 90vh;
      max-height: ${theme.bp.fullHeight - theme.spacing.desktop.dashPadding * 2}px;
    }
  `

  const closeButton = css`
    position: absolute;
    top: 5%;
    right: 5%;
    transition: color 0.2s ease;
    cursor: pointer;
    &:hover {
      color: black;
    }
  `

  const scrollable = css`
    position: absolute;
    top: 15%;
    left: 5px;
    right: 5px;
    bottom: 7.5%;
    overflow: auto;
    @media (min-height: 600px) {
      top: 20%;
    }
  `

  const content = css`
    padding: 5px 5%;
  `

  return { modal, closeButton, scrollable, content }
}

const Modal = props => {
  const classes = getStyles(props)
  const { open, children, onClose, ...rest } = props

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div className={classes.modal} {...rest}>
        <CloseIcon className={classes.closeButton} onClick={onClose} size={30} />
        <div className={classes.scrollable}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </OutsideClickHandler>
  )
}

export default Modal
