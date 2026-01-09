import { Box, Card, CardContent, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { CyclePhase } from '@/types/cycle';

interface DailyInsightProps {
  phase: CyclePhase;
  dayInCycle: number;
}

const insights: Record<CyclePhase, { title: string; description: string; tip: string }> = {
  menstruation: {
    title: 'Rest & Restore',
    description:
      'Estrogen and progesterone are at their lowest. Your body is shedding the uterine lining.',
    tip: 'Stay hydrated and prioritize rest. Iron-rich foods can help replenish what you lose.',
  },
  follicular: {
    title: 'Rising Energy',
    description:
      'Estrogen is climbing! You may notice improved mood, energy, and creativity.',
    tip: 'Great time for new projects and challenging workouts. Your brain is primed for learning.',
  },
  ovulation: {
    title: 'Peak Vitality',
    description:
      'Estrogen peaks and testosterone surges briefly. Many feel their most confident now.',
    tip: 'Highest fertility window. You may feel more social and communicative.',
  },
  luteal: {
    title: 'Winding Down',
    description:
      'Progesterone rises, preparing the body for potential pregnancy or the next cycle.',
    tip: 'Cravings may increase. Focus on balanced meals and be gentle with yourself.',
  },
};

export function DailyInsight({ phase, dayInCycle }: DailyInsightProps) {
  const insight = insights[phase];

  return (
    <Box sx={{ px: 2 }}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, hsl(355, 100%, 97%) 0%, hsl(0, 0%, 98%) 100%)',
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AutoAwesomeIcon sx={{ fontSize: 18, color: 'hsl(349, 89%, 60%)' }} />
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: 'hsl(349, 89%, 60%)' }}
            >
              Daily Insight
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
            {insight.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {insight.description}
          </Typography>
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: 2,
              p: 1.5,
            }}
          >
            <Typography variant="body2" color="text.primary">
              💡 {insight.tip}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
