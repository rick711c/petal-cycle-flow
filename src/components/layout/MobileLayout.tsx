import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { BottomNav } from './BottomNav';

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export function MobileLayout({ children, showNav = true }: MobileLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'md',
        mx: 'auto',
        position: 'relative',
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: 'auto',
          pb: showNav ? '80px' : 0,
        }}
      >
        {children}
      </Box>
      {showNav && <BottomNav />}
    </Box>
  );
}
