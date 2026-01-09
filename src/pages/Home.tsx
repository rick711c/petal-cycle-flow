import { Box, Typography, Avatar } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { CycleRing } from '@/components/cycle/CycleRing';
import { QuickActions } from '@/components/cycle/QuickActions';
import { UpcomingEvents } from '@/components/cycle/UpcomingEvents';
import { DailyInsight } from '@/components/cycle/DailyInsight';
import { useCycleStore } from '@/hooks/useCycleStore';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const { isOnboarded, getCycleStats, settings } = useCycleStore();

  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  const stats = getCycleStats();

  return (
    <MobileLayout>
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box
          sx={{
            px: 2,
            pt: 3,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalFloristIcon sx={{ fontSize: 28, color: 'primary.main' }} />
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Flora
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              Today
            </Typography>
            <Typography variant="body2" fontWeight={500} color="text.primary">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
          </Box>
        </Box>

        {/* Cycle Ring */}
        <Box sx={{ py: 3 }}>
          <CycleRing
            dayInCycle={stats.dayInCycle}
            cycleLength={stats.averageCycleLength}
            currentPhase={stats.currentPhase}
            periodLength={stats.averagePeriodLength}
          />
        </Box>

        {/* Quick Actions */}
        <QuickActions />

        {/* Upcoming Events */}
        <UpcomingEvents stats={stats} />

        {/* Daily Insight */}
        <Box sx={{ mt: 3 }}>
          <DailyInsight phase={stats.currentPhase} dayInCycle={stats.dayInCycle} />
        </Box>
      </Box>
    </MobileLayout>
  );
}
