import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  { icon: <HomeIcon />, label: 'Home', path: '/' },
  { icon: <CalendarMonthIcon />, label: 'Calendar', path: '/calendar' },
  { icon: <AddIcon />, label: 'Log', path: '/log', isCenter: true },
  { icon: <InsightsIcon />, label: 'Insights', path: '/insights' },
  { icon: <SettingsIcon />, label: 'Settings', path: '/settings' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentValue = navItems.findIndex(item => item.path === location.pathname);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: 'md',
        mx: 'auto',
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={currentValue}
        onChange={(_, newValue) => {
          navigate(navItems[newValue].path);
        }}
        showLabels
        sx={{ 
          height: 64,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 60,
          },
        }}
      >
        {navItems.map((item, index) => {
          if (item.isCenter) {
            return (
              <Box
                key={item.path}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 1,
                }}
              >
                <Fab
                  color="primary"
                  size="medium"
                  onClick={() => navigate(item.path)}
                  sx={{
                    mt: -3,
                    width: 56,
                    height: 56,
                  }}
                >
                  {item.icon}
                </Fab>
              </Box>
            );
          }
          return (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              icon={item.icon}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
