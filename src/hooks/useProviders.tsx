'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/hooks/useThemeProvider'
import { UserProvider } from '@/services/useUser'
import { UnitProvider } from '../services/useUnit'
import { ResourceTypeProvider } from '@/services/useResourceType'
import { ResourceProvider } from '@/services/useResource'

interface Props {
  children: React.ReactNode
}

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <UserProvider>
          <UnitProvider>
            <ResourceTypeProvider>
              <ResourceProvider>{children}</ResourceProvider>
            </ResourceTypeProvider>
          </UnitProvider>
        </UserProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers
