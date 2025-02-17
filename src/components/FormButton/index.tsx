import { MoonLoader } from 'react-spinners'
import './index.scss'

import { CSSProperties } from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: VoidFunction
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
  styleType?: 'default' | 'contained' | 'outlined'
  form?: string
  style?: CSSProperties
}

function FormButton({
  children,
  onClick,
  leftIcon,
  rightIcon,
  type = 'button',
  disabled = false,
  isLoading = false,
  styleType = 'default',
  form,
  style,
}: ButtonProps) {
  function returnClassName() {
    let className = 'form-button'

    if (styleType === 'contained') className += ' form-button--contained'
    if (styleType === 'outlined') className += ' form-button--outlined'
    if (disabled) className += ' form-button--disabled'

    return className
  }

  return (
    <button
      onClick={onClick}
      type={type}
      form={form}
      className={returnClassName()}
      style={{ ...style }}>
      {leftIcon && <span className='form-button__left-icon'>{leftIcon}</span>}
      {isLoading ? <MoonLoader color='#fff' /> : children}
      {rightIcon && <span className='form-button__right-icon'>{rightIcon}</span>}
    </button>
  )
}

export default FormButton
