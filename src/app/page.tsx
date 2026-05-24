import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-slate-900">
          Formularios públicos IPS Centir
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Selecciona el formulario que necesitas completar.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Registro mínimo de paciente
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Registra información básica del paciente para continuar su proceso.
            </p>
            <Link
              href="/registro-paciente"
              className="mt-4 inline-flex rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Ir al formulario
            </Link>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Crear PQRS</h2>
            <p className="mt-2 text-sm text-slate-600">
              Envía una petición, queja, reclamo o sugerencia de manera segura.
            </p>
            <Link
              href="/pqrs"
              className="mt-4 inline-flex rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Ir al formulario
            </Link>
          </article>
        </div>
      </section>
    </main>
  )
}
