import { ReactNode } from 'react'
import { ErrorMessage } from './ErrorMessage'

interface FormFieldProps {
  label: string
  error?: string
  hint?: string
  children: ReactNode
}

export const FormField = ({ label, error, hint, children }: FormFieldProps) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      <ErrorMessage message={error} />
    </div>
  )
}
