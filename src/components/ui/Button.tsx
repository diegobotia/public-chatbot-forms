import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const Button = ({
  className,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex w-full items-center justify-center rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Enviando...' : children}
    </button>
  )
}
