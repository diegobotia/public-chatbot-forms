import { TextareaHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
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

Textarea.displayName = 'Textarea'
