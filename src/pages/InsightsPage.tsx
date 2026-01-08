import { useMemo } from 'react';
import { TrendingUp, CalendarDays, Clock, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCycleStore } from '@/hooks/useCycleStore';

export default function InsightsPage() {
  const { getCycleStats, cycles, dayLogs } = useCycleStore();
  const stats = getCycleStats();

  const insights = useMemo(() => {
    const completedCycles = cycles.filter(c => c.length);
    const avgCycleLength = completedCycles.length > 0
      ? Math.round(completedCycles.reduce((sum, c) => sum + (c.length || 0), 0) / completedCycles.length)
      : stats.averageCycleLength;

    const moodCounts: Record<string, number> = {};
    const symptomCounts: Record<string, number> = {};

    dayLogs.forEach(log => {
      log.moods.forEach(mood => {
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      });
      log.symptoms.forEach(symptom => {
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
      icon: CalendarDays,
      label: 'Avg Cycle',
      value: `${insights.avgCycleLength} days`,
      color: 'hsl(var(--primary))',
      bgColor: 'hsl(var(--primary) / 0.1)',
    },
    {
      icon: Clock,
      label: 'Cycles Tracked',
      value: insights.totalCycles.toString(),
      color: 'hsl(var(--chart-2))',
      bgColor: 'hsl(var(--chart-2) / 0.1)',
    },
    {
      icon: Activity,
      label: 'Days Logged',
      value: insights.totalLogs.toString(),
      color: 'hsl(var(--chart-3))',
      bgColor: 'hsl(var(--chart-3) / 0.1)',
    },
    {
      icon: TrendingUp,
      label: 'Current Day',
      value: `Day ${stats.dayInCycle}`,
      color: 'hsl(var(--chart-4))',
      bgColor: 'hsl(var(--chart-4) / 0.1)',
    },
  ];

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Insights</h1>
          <p className="text-muted-foreground">
            Understand your patterns
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Patterns */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Your Patterns</h3>
            
            {insights.totalLogs > 0 ? (
              <div className="space-y-4">
                {insights.topMood && (
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm text-muted-foreground">Most common mood</span>
                    <span className="font-medium text-foreground capitalize">{insights.topMood}</span>
                  </div>
                )}
                {insights.topSymptom && (
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm text-muted-foreground">Most common symptom</span>
                    <span className="font-medium text-foreground capitalize">
                      {insights.topSymptom.replace('_', ' ')}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span className="text-sm text-muted-foreground">Next period in</span>
                  <span className="font-medium text-primary">
                    {Math.max(0, stats.averageCycleLength - stats.dayInCycle)} days
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                Start logging to see your patterns! 📊
              </p>
            )}
          </CardContent>
        </Card>

        {/* Health Tip */}
        <Card className="border-0 bg-gradient-to-br from-accent to-card">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2">💡 Health Tip</h3>
            <p className="text-sm text-muted-foreground">
              Tracking your cycle consistently helps identify patterns and potential health issues early. 
              Try to log at least your period dates and major symptoms for the most accurate insights.
            </p>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
