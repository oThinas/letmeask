// Permite passar como parâmetro qualquer atributo que uma tag html <button> pode receber
import { ButtonHTMLAttributes } from 'react'

import './style.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
	return (
    <button className="button" {...props} />
  )
}