import React from 'react'
import { css } from 'react-emotion'
import CloseIcon from 'mdi-react/CloseIcon'
import theme from 'theme'

const getStyles = props => {
  const modal = css`
    display: ${props.open ? 'block' : 'none'};
    position: absolute;
    min-height: 60%;
    top: 20%;
    background: #fff;
    box-shadow: 10px 10px 120px rgba(0, 0, 0, 0.2);
    left: ${theme.spacing.mobile.dashPadding};
    right: ${theme.spacing.mobile.dashPadding};
    @media (min-width: ${theme.bp.tablet}px) {
      left: ${theme.spacing.tablet.dashPadding};
      right: ${theme.spacing.tablet.dashPadding};
    }
    @media (min-width: ${theme.bp.desktop}px) {
      left: ${theme.spacing.desktop.dashPadding};
      right: ${theme.spacing.desktop.dashPadding};
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

  const content = css`
    margin: 12% 5%;
  `

  return { modal, closeButton, content }
}

const Modal = props => {
  const classes = getStyles(props)
  const { open, children, onClose, ...rest } = props

  return (
    <div className={classes.modal} {...rest}>
      <CloseIcon className={classes.closeButton} onClick={onClose} size={30} />
      <div className={classes.content}>{children}</div>
    </div>
  )
}

export default Modal
