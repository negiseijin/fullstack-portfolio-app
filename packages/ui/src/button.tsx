'use client'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
  Required<Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>>

export const Button = ({ children, type, ...rest }: Props) => {
  return (
    <button className="underline text-7xl font-bold bg-success-500" type={type} {...rest}>
      {children}
    </button>
  )
}
