const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) {
    return fallback
  }
  return value.toLowerCase() === 'true'
}

export const appConfig = {
  appName: 'Formularios IPS Centir',
  useMocks: parseBoolean(process.env.NEXT_PUBLIC_USE_MOCKS, true),
} as const
