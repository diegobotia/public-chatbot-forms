import { PatientRegistrationForm } from '@/components/forms/PatientRegistrationForm'
import { PublicFormLayout } from '@/components/layout/PublicFormLayout'

export default function RegistroPacientePage() {
  return (
    <PublicFormLayout
      title="Registro mínimo de paciente"
      description="Completa el formulario con la información solicitada para registrar al paciente."
    >
      <PatientRegistrationForm />
    </PublicFormLayout>
  )
}
