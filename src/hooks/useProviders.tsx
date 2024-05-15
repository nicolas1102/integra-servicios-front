'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/hooks/useThemeProvider'
import { UserProvider } from '@/services/useUser'
import { UnitProvider } from '../services/useUnit'
import { ResourceTypeProvider } from '@/services/useResourceType'
import { ResourceProvider } from '@/services/useResource'
import { BookingProvider } from '@/services/useBooking'
import { BazuquerosResourceProvider } from '@/services/useBazuquerosResource'

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
              <ResourceProvider>
                <BookingProvider>
                  <BazuquerosResourceProvider>
                    {children}
                  </BazuquerosResourceProvider>
                </BookingProvider>
              </ResourceProvider>
            </ResourceTypeProvider>
          </UnitProvider>
        </UserProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers
