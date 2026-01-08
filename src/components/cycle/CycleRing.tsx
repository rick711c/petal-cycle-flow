import { useMemo } from 'react';
import type { CyclePhase } from '@/types/cycle';

interface CycleRingProps {
  dayInCycle: number;
  cycleLength: number;
  currentPhase: CyclePhase;
  periodLength: number;
}

const phaseColors: Record<CyclePhase, string> = {
  menstruation: 'hsl(var(--primary))',
  follicular: 'hsl(var(--chart-3))',
  ovulation: 'hsl(var(--chart-2))',
  luteal: 'hsl(var(--chart-4))',
};

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
    <div className="relative w-52 h-52 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background segments */}
        {phases.map((segment, index) => {
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
              fill={phaseColors[segment.phase]}
              opacity={segment.phase === currentPhase ? 1 : 0.3}
              className="transition-opacity duration-300"
            />
          );
        })}

        {/* Inner circle */}
        <circle cx="50" cy="50" r="35" fill="hsl(var(--card))" />

        {/* Progress indicator */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{dayInCycle}</span>
        <span className="text-sm text-muted-foreground font-medium">Day of cycle</span>
        <span className="mt-2 px-3 py-1 rounded-full text-xs font-semibold" 
          style={{ 
            backgroundColor: `${phaseColors[currentPhase]}20`,
            color: phaseColors[currentPhase]
          }}>
          {phaseLabels[currentPhase]}
        </span>
      </div>
    </div>
  );
}
