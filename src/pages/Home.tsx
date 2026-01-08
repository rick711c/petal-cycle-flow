import { Flower2 } from 'lucide-react';
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
      <div className="pb-6">
        {/* Header */}
        <div className="px-4 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flower2 className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-foreground">Flora</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-sm font-medium text-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Cycle Ring */}
        <div className="py-6">
          <CycleRing
            dayInCycle={stats.dayInCycle}
            cycleLength={stats.averageCycleLength}
            currentPhase={stats.currentPhase}
            periodLength={stats.averagePeriodLength}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Upcoming Events */}
        <UpcomingEvents stats={stats} />

        {/* Daily Insight */}
        <div className="mt-6">
          <DailyInsight phase={stats.currentPhase} dayInCycle={stats.dayInCycle} />
        </div>
      </div>
    </MobileLayout>
  );
}
