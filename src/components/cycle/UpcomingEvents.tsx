import { format, parseISO, differenceInDays } from 'date-fns';
import { Calendar, Heart, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { CycleStats } from '@/types/cycle';

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
      icon: Moon,
      label: 'Next Period',
      date: format(nextPeriod, 'MMM d'),
      days: daysUntilPeriod,
      color: 'hsl(var(--primary))',
      bgColor: 'hsl(var(--primary) / 0.1)',
    },
    {
      icon: Heart,
      label: isInFertileWindow ? 'Fertile Window' : 'Ovulation',
      date: isInFertileWindow ? 'Now' : format(ovulation, 'MMM d'),
      days: isInFertileWindow ? 0 : daysUntilOvulation,
      color: 'hsl(var(--chart-2))',
      bgColor: 'hsl(var(--chart-2) / 0.1)',
    },
  ];

  return (
    <div className="px-4 space-y-3">
      <h3 className="font-semibold text-foreground">Upcoming</h3>
      <div className="grid grid-cols-2 gap-3">
        {events.map((event) => (
          <Card key={event.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: event.bgColor }}
              >
                <event.icon className="w-5 h-5" style={{ color: event.color }} />
              </div>
              <p className="text-sm font-medium text-foreground">{event.label}</p>
              <p className="text-lg font-bold" style={{ color: event.color }}>
                {event.days === 0 ? 'Today!' : `${event.days} days`}
              </p>
              <p className="text-xs text-muted-foreground">{event.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
