import { ReactNode } from 'react'
import Image from 'next/image'

interface PublicFormLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export const PublicFormLayout = ({
  title,
  description,
  children,
}: PublicFormLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex justify-center">
          <Image
            src="/LOGO.svg"
            alt="Logo IPS Centir"
            width={220}
            height={220}
            priority
            className="h-auto w-32 sm:w-40 md:w-44"
          />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <div className="mt-6">{children}</div>
        <p className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
          Tu información será tratada de forma segura conforme a la política de
          protección de datos.
        </p>
      </div>
    </main>
  )
}
