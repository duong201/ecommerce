import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

const Button = ({ to, href, btnFooter, children, onClick, onChange, ...passProps }) => {
  let Comp = 'button'
  const props = {
    onClick,
    onChange,
    ...passProps,
  }

  if (to) {
    props.to = to
    Comp = Link
  } else if (href) {
    props.href = href
    Comp = 'a'
  }

  const classes = cx('wrapper', {
    btnFooter,
  })

  return (
    <>
      <Comp className={classes} {...props}>
        <span>{children}</span>
      </Comp>
    </>
  )
}

export default Button
