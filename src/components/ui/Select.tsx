import { SelectHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2',
          hasError
            ? 'border-red-500 focus:ring-red-200'
            : 'border-slate-300 focus:ring-sky-200',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    )
  },
)

Select.displayName = 'Select'
