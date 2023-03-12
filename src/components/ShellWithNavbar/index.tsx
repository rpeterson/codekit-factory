import { Box } from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { Navbar } from './Navbar'

export const ShellWithNavbar = ({ children }: { children: ReactNode }) => (
  <Box as="section" height="100vh" overflowY="auto">
    <Navbar />
    {children}
  </Box>
)
