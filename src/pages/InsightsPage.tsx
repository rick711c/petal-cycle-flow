import { useMemo } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCycleStore } from '@/hooks/useCycleStore';
import { cyclePhaseColors, chartColors } from '@/theme/muiTheme';

export default function InsightsPage() {
  const { getCycleStats, cycles, dayLogs } = useCycleStore();
  const stats = getCycleStats();

  const insights = useMemo(() => {
    const completedCycles = cycles.filter((c) => c.length);
    const avgCycleLength =
      completedCycles.length > 0
        ? Math.round(
            completedCycles.reduce((sum, c) => sum + (c.length || 0), 0) / completedCycles.length
          )
        : stats.averageCycleLength;

    const moodCounts: Record<string, number> = {};
    const symptomCounts: Record<string, number> = {};

    dayLogs.forEach((log) => {
      log.moods.forEach((mood) => {
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      });
      log.symptoms.forEach((symptom) => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });

    const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    const topSymptom = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      avgCycleLength,
      totalCycles: cycles.length,
      totalLogs: dayLogs.length,
      topMood: topMood ? topMood[0] : null,
      topSymptom: topSymptom ? topSymptom[0] : null,
    };
  }, [cycles, dayLogs, stats]);

  const statCards = [
    {
      icon: CalendarTodayIcon,
      label: 'Avg Cycle',
      value: `${insights.avgCycleLength} days`,
      color: cyclePhaseColors.menstruation,
    },
    {
      icon: AccessTimeIcon,
      label: 'Cycles Tracked',
      value: insights.totalCycles.toString(),
      color: chartColors.chart2,
    },
    {
      icon: ShowChartIcon,
      label: 'Days Logged',
      value: insights.totalLogs.toString(),
      color: chartColors.chart3,
    },
    {
      icon: TrendingUpIcon,
      label: 'Current Day',
      value: `Day ${stats.dayInCycle}`,
      color: chartColors.chart4,
    },
  ];

  return (
    <MobileLayout>
      <Box sx={{ px: 2, pt: 3, pb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Insights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Understand your patterns
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
          {statCards.map((stat) => (
            <Card key={stat.label}>
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${stat.color}15`,
                      mb: 1.5,
                    }}
                  >
                    <stat.icon sx={{ color: stat.color, fontSize: 20 }} />
                  </Box>
                  <Typography variant="h5" fontWeight={700} color="text.primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Box>

        {/* Patterns */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
              Your Patterns
            </Typography>

            {insights.totalLogs > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {insights.topMood && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      bgcolor: 'action.hover',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Most common mood
                    </Typography>
                    <Typography variant="body1" fontWeight={500} color="text.primary" textTransform="capitalize">
                      {insights.topMood}
                    </Typography>
                  </Box>
                )}
                {insights.topSymptom && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      bgcolor: 'action.hover',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Most common symptom
                    </Typography>
                    <Typography variant="body1" fontWeight={500} color="text.primary" textTransform="capitalize">
                      {insights.topSymptom.replace('_', ' ')}
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    bgcolor: 'action.hover',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Next period in
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="primary.main">
                    {Math.max(0, stats.averageCycleLength - stats.dayInCycle)} days
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                Start logging to see your patterns! 📊
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Health Tip */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, hsl(355, 100%, 97%) 0%, hsl(0, 0%, 98%) 100%)',
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 1 }}>
              💡 Health Tip
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tracking your cycle consistently helps identify patterns and potential health issues early.
              Try to log at least your period dates and major symptoms for the most accurate insights.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </MobileLayout>
  );
}
