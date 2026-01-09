import { Box, Button } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CheckIcon from '@mui/icons-material/Check';
import { useCycleStore } from '@/hooks/useCycleStore';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';

export function QuickActions() {
  const { startPeriod, endPeriod, dayLogs, cycles } = useCycleStore();
  const { enqueueSnackbar } = useSnackbar();
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayLog = dayLogs.find((l) => l.date === today);
  const currentCycle = cycles[cycles.length - 1];
  const isPeriodActive = currentCycle && !currentCycle.endDate;

  const handlePeriodToggle = () => {
    if (isPeriodActive) {
      endPeriod();
      enqueueSnackbar('Period ended - Take care of yourself! 💕', { variant: 'success' });
    } else {
      startPeriod();
      enqueueSnackbar('Period started - Tracking your cycle 🌸', { variant: 'success' });
    }
  };

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Button
        onClick={handlePeriodToggle}
        variant="contained"
        color={isPeriodActive ? 'secondary' : 'primary'}
        size="large"
        fullWidth
        startIcon={isPeriodActive ? <CheckIcon /> : <WaterDropIcon />}
        sx={{
          height: 56,
          fontSize: '1.1rem',
          fontWeight: 600,
        }}
      >
        {isPeriodActive ? 'Period Ended' : 'Period Started'}
      </Button>

      {isPeriodActive && (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 1.5 }}
        >
          Tap when your period ends to log the duration
        </Typography>
      )}
    </Box>
  );
}
