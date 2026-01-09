import { Box, Card, CardContent, Typography, Switch, Divider, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCycleStore } from '@/hooks/useCycleStore';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { settings, updateSettings, setOnboarded } = useCycleStore();

  const handleReset = () => {
    localStorage.clear();
    setOnboarded(false);
    enqueueSnackbar('Data cleared', { variant: 'success' });
    navigate('/onboarding');
  };

  const settingsGroups = [
    {
      title: 'Notifications',
      items: [
        {
          icon: NotificationsIcon,
          label: 'Period Reminders',
          description: 'Get notified before your period',
          type: 'toggle' as const,
          value: settings.notificationsEnabled,
          onChange: () => updateSettings({ notificationsEnabled: !settings.notificationsEnabled }),
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          icon: LockIcon,
          label: 'App Lock',
          description: 'Require passcode to open',
          type: 'toggle' as const,
          value: false,
          onChange: () => enqueueSnackbar('Coming soon!', { variant: 'info' }),
        },
        {
          icon: DarkModeIcon,
          label: 'Discreet Mode',
          description: 'Hide sensitive notifications',
          type: 'toggle' as const,
          value: false,
          onChange: () => enqueueSnackbar('Coming soon!', { variant: 'info' }),
        },
      ],
    },
    {
      title: 'Data',
      items: [
        {
          icon: DownloadIcon,
          label: 'Export Data',
          description: 'Download your health data',
          type: 'link' as const,
          onClick: () => enqueueSnackbar('Coming soon!', { variant: 'info' }),
        },
        {
          icon: DeleteIcon,
          label: 'Clear All Data',
          description: 'Delete all your data permanently',
          type: 'danger' as const,
          onClick: handleReset,
        },
      ],
    },
  ];

  return (
    <MobileLayout>
      <Box sx={{ px: 2, pt: 3, pb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customize your experience
          </Typography>
        </Box>

        {/* Cycle Settings */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
              Cycle Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body1" fontWeight={500} color="text.primary">
                    Cycle Length
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average days
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  {settings.averageCycleLength}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body1" fontWeight={500} color="text.primary">
                    Period Length
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average days
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  {settings.averagePeriodLength}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body1" fontWeight={500} color="text.primary">
                    Goal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your tracking focus
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={500} color="text.secondary" textTransform="capitalize">
                  {settings.goal}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <Card key={group.title} sx={{ mb: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
                {group.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {group.items.map((item, index) => (
                  <Box key={item.label}>
                    <Box
                      onClick={item.type === 'link' || item.type === 'danger' ? item.onClick : undefined}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: item.type === 'link' || item.type === 'danger' ? 'pointer' : 'default',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: item.type === 'danger' ? 'error.light' : 'action.hover',
                          }}
                        >
                          <item.icon
                            sx={{
                              fontSize: 20,
                              color: item.type === 'danger' ? 'error.main' : 'text.secondary',
                            }}
                          />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body1"
                            fontWeight={500}
                            color={item.type === 'danger' ? 'error.main' : 'text.primary'}
                          >
                            {item.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                      {item.type === 'toggle' && (
                        <Switch checked={item.value} onChange={item.onChange} color="primary" />
                      )}
                      {(item.type === 'link' || item.type === 'danger') && (
                        <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                      )}
                    </Box>
                    {index < group.items.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* App Info */}
        <Box sx={{ textAlign: 'center', pt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <LocalFloristIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="h6" fontWeight={600} color="text.primary">
              Flora
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Version 1.0.0
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Your cycle, your data, your privacy.
          </Typography>
        </Box>
      </Box>
    </MobileLayout>
  );
}
