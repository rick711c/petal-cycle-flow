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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCycleStore } from '@/hooks/useCycleStore';
import { cn } from '@/lib/utils';
import type { CyclePhase } from '@/types/cycle';

const phaseColors: Record<CyclePhase, string> = {
  menstruation: 'bg-primary',
  follicular: 'bg-chart-3',
  ovulation: 'bg-chart-2',
  luteal: 'bg-chart-4',
};

const phaseBgColors: Record<CyclePhase, string> = {
  menstruation: 'bg-primary/20',
  follicular: 'bg-chart-3/20',
  ovulation: 'bg-chart-2/20',
  luteal: 'bg-chart-4/20',
};

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
    const log = dayLogs.find(l => l.date === dateStr);
    const phase = getPhaseForDate(dateStr);
    return { log, phase };
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold text-foreground">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const { log, phase } = getDayStatus(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isPeriodDay = log?.isPeriod;

            return (
              <button
                key={day.toISOString()}
                className={cn(
                  'aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all',
                  !isCurrentMonth && 'opacity-30',
                  isToday(day) && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
                  isPeriodDay ? phaseColors[phase] : phaseBgColors[phase]
                )}
              >
                <span className={cn(
                  'font-medium',
                  isPeriodDay ? 'text-primary-foreground' : 'text-foreground'
                )}>
                  {format(day, 'd')}
                </span>
                {isPeriodDay && (
                  <span className="text-[10px] text-primary-foreground/80">•</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-card rounded-2xl">
          <h3 className="font-semibold text-foreground mb-3">Cycle Phases</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(phaseColors).map(([phase, colorClass]) => (
              <div key={phase} className="flex items-center gap-2">
                <div className={cn('w-3 h-3 rounded-full', colorClass)} />
                <span className="text-sm text-muted-foreground capitalize">{phase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
