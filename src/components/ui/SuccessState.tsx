interface SuccessStateProps {
  title: string
  description: string
}

export const SuccessState = ({ title, description }: SuccessStateProps) => {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
      <p className="text-sm font-semibold text-emerald-800">{title}</p>
      <p className="mt-1 text-sm text-emerald-700">{description}</p>
    </div>
  )
}
