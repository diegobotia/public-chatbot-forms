export const LoadingState = ({ message }: { message: string }) => {
  return (
    <div className="rounded-lg border border-sky-100 bg-sky-50 p-3 text-sm text-sky-800">
      {message}
    </div>
  )
}
