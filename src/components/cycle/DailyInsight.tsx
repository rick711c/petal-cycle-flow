import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { CyclePhase } from '@/types/cycle';

interface DailyInsightProps {
  phase: CyclePhase;
  dayInCycle: number;
}

const insights: Record<CyclePhase, { title: string; description: string; tip: string }> = {
  menstruation: {
    title: 'Rest & Restore',
    description: 'Estrogen and progesterone are at their lowest. Your body is shedding the uterine lining.',
    tip: 'Stay hydrated and prioritize rest. Iron-rich foods can help replenish what you lose.',
  },
  follicular: {
    title: 'Rising Energy',
    description: 'Estrogen is climbing! You may notice improved mood, energy, and creativity.',
    tip: 'Great time for new projects and challenging workouts. Your brain is primed for learning.',
  },
  ovulation: {
    title: 'Peak Vitality',
    description: 'Estrogen peaks and testosterone surges briefly. Many feel their most confident now.',
    tip: 'Highest fertility window. You may feel more social and communicative.',
  },
  luteal: {
    title: 'Winding Down',
    description: 'Progesterone rises, preparing the body for potential pregnancy or the next cycle.',
    tip: 'Cravings may increase. Focus on balanced meals and be gentle with yourself.',
  },
};

export function DailyInsight({ phase, dayInCycle }: DailyInsightProps) {
  const insight = insights[phase];

  return (
    <div className="px-4">
      <Card className="border-0 bg-gradient-to-br from-accent to-card shadow-sm overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-semibold text-accent-foreground">Daily Insight</span>
          </div>
          <h4 className="font-bold text-foreground mb-1">{insight.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
          <p className="text-sm text-foreground bg-card/50 rounded-lg p-3">
            💡 {insight.tip}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
