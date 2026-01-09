import { useState, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCycleStore } from '@/hooks/useCycleStore';
import { cyclePhaseColors } from '@/theme/muiTheme';
import type { CyclePhase } from '@/types/cycle';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { getPhaseForDate, dayLogs } = useCycleStore();

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (date: Date) => isSameDay(date, new Date());

  const getDayStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const log = dayLogs.find((l) => l.date === dateStr);
    const phase = getPhaseForDate(dateStr);
    return { log, phase };
  };

  const phaseLabels: Record<CyclePhase, string> = {
    menstruation: 'Period',
    follicular: 'Follicular',
    ovulation: 'Ovulation',
    luteal: 'Luteal',
  };

  return (
    <MobileLayout>
      <Box sx={{ px: 2, pt: 3, pb: 3 }}>
        {/* Month Navigation */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <IconButton onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            {format(currentMonth, 'MMMM yyyy')}
          </Typography>
          <IconButton onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Week Days Header */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 1 }}>
          {weekDays.map((day) => (
            <Typography
              key={day}
              variant="caption"
              color="text.secondary"
              fontWeight={500}
              textAlign="center"
              display="block"
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Calendar Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
          {days.map((day) => {
            const { log, phase } = getDayStatus(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isPeriodDay = log?.isPeriod;

            return (
              <Box
                key={day.toISOString()}
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  opacity: isCurrentMonth ? 1 : 0.3,
                  bgcolor: isPeriodDay
                    ? cyclePhaseColors[phase]
                    : `${cyclePhaseColors[phase]}20`,
                  border: isToday(day) ? 2 : 0,
                  borderColor: 'primary.main',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    color: isPeriodDay ? '#fff' : 'text.primary',
                  }}
                >
                  {format(day, 'd')}
                </Typography>
                {isPeriodDay && (
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 8 }}
                  >
                    •
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Legend */}
        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
              Cycle Phases
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
              {(Object.keys(cyclePhaseColors) as CyclePhase[]).map((phase) => (
                <Box key={phase} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: cyclePhaseColors[phase],
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" textTransform="capitalize">
                    {phaseLabels[phase]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </MobileLayout>
  );
}
