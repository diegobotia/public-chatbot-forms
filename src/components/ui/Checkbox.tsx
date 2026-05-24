import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          'h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-300',
          hasError && 'border-red-500 ring-1 ring-red-200',
          className,
        )}
        {...props}
      />
    )
  },
)

Checkbox.displayName = 'Checkbox'
