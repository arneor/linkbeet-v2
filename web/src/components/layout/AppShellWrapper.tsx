'use client'

import { AppShell } from './AppShell'

export function AppShellWrapper({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
