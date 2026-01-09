import { useMemo } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import type { CyclePhase } from '@/types/cycle';
import { cyclePhaseColors } from '@/theme/muiTheme';

interface CycleRingProps {
  dayInCycle: number;
  cycleLength: number;
  currentPhase: CyclePhase;
  periodLength: number;
}

const phaseLabels: Record<CyclePhase, string> = {
  menstruation: 'Period',
  follicular: 'Follicular',
  ovulation: 'Ovulation',
  luteal: 'Luteal',
};

export function CycleRing({ dayInCycle, cycleLength, currentPhase, periodLength }: CycleRingProps) {
  const progress = (dayInCycle / cycleLength) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const phases = useMemo(() => {
    const ovulationDay = cycleLength - 14;
    return [
      { phase: 'menstruation' as CyclePhase, start: 0, end: periodLength / cycleLength },
      { phase: 'follicular' as CyclePhase, start: periodLength / cycleLength, end: (ovulationDay - 1) / cycleLength },
      { phase: 'ovulation' as CyclePhase, start: (ovulationDay - 1) / cycleLength, end: (ovulationDay + 3) / cycleLength },
      { phase: 'luteal' as CyclePhase, start: (ovulationDay + 3) / cycleLength, end: 1 },
    ];
  }, [cycleLength, periodLength]);

  return (
    <Box sx={{ position: 'relative', width: 208, height: 208, mx: 'auto' }}>
      <svg
        style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
        viewBox="0 0 100 100"
      >
        {/* Background segments */}
        {phases.map((segment) => {
          const startAngle = segment.start * 360;
          const endAngle = segment.end * 360;
          const sweepAngle = endAngle - startAngle;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = 50 + 45 * Math.cos(startRad);
          const y1 = 50 + 45 * Math.sin(startRad);
          const x2 = 50 + 45 * Math.cos(endRad);
          const y2 = 50 + 45 * Math.sin(endRad);

          const largeArcFlag = sweepAngle > 180 ? 1 : 0;

          return (
            <path
              key={segment.phase}
              d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={cyclePhaseColors[segment.phase]}
              opacity={segment.phase === currentPhase ? 1 : 0.3}
              style={{ transition: 'opacity 0.3s' }}
            />
          );
        })}

        {/* Inner circle */}
        <circle cx="50" cy="50" r="35" fill="hsl(0, 0%, 98%)" />

        {/* Progress indicator */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(240, 5%, 10%)"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'all 0.5s' }}
        />
      </svg>

      {/* Center content */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" fontWeight={700} color="text.primary">
          {dayInCycle}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          Day of cycle
        </Typography>
        <Chip
          label={phaseLabels[currentPhase]}
          size="small"
          sx={{
            mt: 1,
            bgcolor: `${cyclePhaseColors[currentPhase]}20`,
            color: cyclePhaseColors[currentPhase],
            fontWeight: 600,
          }}
        />
      </Box>
    </Box>
  );
}
