import React, { JSX } from 'react'

interface ButtonProps {
    children: React.ReactNode
}

const Button = ({children}: ButtonProps): JSX.Element => {
  return (
    <button className='px-3'>{children}</button>
  )
}

export default Button