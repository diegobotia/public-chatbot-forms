const resolveBackendBaseUrl = (): string =>
  (
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    'http://localhost:8080'
  ).replace(/\/$/, '')

const buildBackendUrl = (path: string): string =>
  `${resolveBackendBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`

export async function POST(request: Request): Promise<Response> {
  const rawBody = await request.text()

  try {
    const backendResponse = await fetch(buildBackendUrl('/api/v1/forms/pqrs'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: rawBody,
      cache: 'no-store',
    })

    const responseText = await backendResponse.text()
    const contentType =
      backendResponse.headers.get('content-type') ?? 'application/json'

    return new Response(responseText, {
      status: backendResponse.status,
      headers: {
        'Content-Type': contentType,
      },
    })
  } catch {
    return Response.json(
      {
        message:
          'No fue posible conectar con el backend desde el proxy. Verifica API_BASE_URL o NEXT_PUBLIC_API_BASE_URL.',
      },
      { status: 503 },
    )
  }
}
