import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2',
          hasError
            ? 'border-red-500 focus:ring-red-200'
            : 'border-slate-300 focus:ring-sky-200',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
