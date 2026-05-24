import { PqrsForm } from '@/components/forms/PqrsForm'
import { PublicFormLayout } from '@/components/layout/PublicFormLayout'

export default function PqrsPage() {
  return (
    <PublicFormLayout
      title="Crear PQRS"
      description="Diligencia este formulario para enviar una petición, queja, reclamo o sugerencia."
    >
      <PqrsForm />
    </PublicFormLayout>
  )
}
