import { Droplets, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCycleStore } from '@/hooks/useCycleStore';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function QuickActions() {
  const { startPeriod, endPeriod, dayLogs, cycles } = useCycleStore();
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayLog = dayLogs.find(l => l.date === today);
  const currentCycle = cycles[cycles.length - 1];
  const isPeriodActive = currentCycle && !currentCycle.endDate;

  const handlePeriodToggle = () => {
    if (isPeriodActive) {
      endPeriod();
      toast.success('Period ended', {
        description: 'Take care of yourself! 💕',
      });
    } else {
      startPeriod();
      toast.success('Period started', {
        description: 'Tracking your cycle 🌸',
      });
    }
  };

  return (
    <div className="px-4 py-6">
      <Button
        onClick={handlePeriodToggle}
        className="w-full h-14 text-lg font-semibold shadow-lg"
        variant={isPeriodActive ? 'secondary' : 'default'}
      >
        {isPeriodActive ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            Period Ended
          </>
        ) : (
          <>
            <Droplets className="w-5 h-5 mr-2" />
            Period Started
          </>
        )}
      </Button>

      {isPeriodActive && (
        <p className="text-center text-sm text-muted-foreground mt-3">
          Tap when your period ends to log the duration
        </p>
      )}
    </div>
  );
}
