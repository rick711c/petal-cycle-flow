import { format, parseISO, differenceInDays } from 'date-fns';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { CycleStats } from '@/types/cycle';
import { cyclePhaseColors, chartColors } from '@/theme/muiTheme';

interface UpcomingEventsProps {
  stats: CycleStats;
}

export function UpcomingEvents({ stats }: UpcomingEventsProps) {
  const today = new Date();
  const nextPeriod = parseISO(stats.nextPeriodDate);
  const ovulation = parseISO(stats.ovulationDate);
  const fertileStart = parseISO(stats.fertileWindowStart);
  const fertileEnd = parseISO(stats.fertileWindowEnd);

  const daysUntilPeriod = differenceInDays(nextPeriod, today);
  const daysUntilOvulation = differenceInDays(ovulation, today);
  const isInFertileWindow = today >= fertileStart && today <= fertileEnd;

  const events = [
    {
      icon: NightsStayIcon,
      label: 'Next Period',
      date: format(nextPeriod, 'MMM d'),
      days: daysUntilPeriod,
      color: cyclePhaseColors.menstruation,
    },
    {
      icon: FavoriteIcon,
      label: isInFertileWindow ? 'Fertile Window' : 'Ovulation',
      date: isInFertileWindow ? 'Now' : format(ovulation, 'MMM d'),
      days: isInFertileWindow ? 0 : daysUntilOvulation,
      color: chartColors.chart2,
    },
  ];

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
        Upcoming
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {events.map((event) => (
          <Card key={event.label}>
              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${event.color}15`,
                    mb: 1.5,
                  }}
                >
                  <event.icon sx={{ color: event.color, fontSize: 20 }} />
                </Box>
                <Typography variant="body2" fontWeight={500} color="text.primary">
                  {event.label}
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ color: event.color }}>
                  {event.days === 0 ? 'Today!' : `${event.days} days`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {event.date}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Box>
    </Box>
  );
}
