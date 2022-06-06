// Permite passar como parâmetro qualquer atributo que uma tag html <button> pode receber
import { ButtonHTMLAttributes } from 'react'

import './style.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
  isRed?: boolean
  isGray?: boolean
};

export function Button({ isOutlined = false, isRed = false, isGray = false, ...props }: ButtonProps) {
	return (
    <button 
      className={`button ${isOutlined && 'outlined'} ${isRed && 'red'} ${isGray && 'gray'}`} 
      {...props} 
    />
  )
}