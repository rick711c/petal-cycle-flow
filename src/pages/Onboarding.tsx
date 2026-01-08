import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCycleStore } from '@/hooks/useCycleStore';
import { format, subDays } from 'date-fns';
import heroFlowers from '@/assets/hero-flowers.png';

type Step = 'welcome' | 'lastPeriod' | 'cycleLength' | 'periodLength' | 'goal';

interface OnboardingData {
  lastPeriodDate: string;
  averageCycleLength: number;
  averagePeriodLength: number;
  goal: 'track' | 'conceive' | 'pregnancy';
}

export default function Onboarding() {
  const navigate = useNavigate();
  const { setOnboarded, updateSettings } = useCycleStore();
  const [step, setStep] = useState<Step>('welcome');
  const [data, setData] = useState<OnboardingData>({
    lastPeriodDate: format(subDays(new Date(), 14), 'yyyy-MM-dd'),
    averageCycleLength: 28,
    averagePeriodLength: 5,
    goal: 'track',
  });

  const handleComplete = () => {
    updateSettings(data);
    setOnboarded(true);
    navigate('/');
  };

  const steps: Step[] = ['welcome', 'lastPeriod', 'cycleLength', 'periodLength', 'goal'];
  const currentIndex = steps.indexOf(step);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    } else {
      handleComplete();
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const goals = [
    { id: 'track', label: 'Track my cycle', emoji: '📅', description: 'Understand your body better' },
    { id: 'conceive', label: 'Try to conceive', emoji: '👶', description: 'Optimize fertility window' },
    { id: 'pregnancy', label: 'Track pregnancy', emoji: '🤰', description: 'Monitor your journey' },
  ] as const;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={heroFlowers} 
          alt="Floral background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <Flower2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Flora</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      {step !== 'welcome' && (
        <div className="px-6 py-4">
          <div className="flex gap-1">
            {steps.slice(1).map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= currentIndex - 1 ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-6 py-4 flex flex-col">
        {step === 'welcome' && (
          <div className="flex-1 flex flex-col justify-center text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Welcome to Flora
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your personal cycle companion. Let's set up your profile to give you accurate predictions.
            </p>
            <Button onClick={goNext} size="lg" className="w-full">
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {step === 'lastPeriod' && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              When did your last period start?
            </h2>
            <p className="text-muted-foreground mb-6">
              This helps us predict your cycle accurately.
            </p>
            <div className="space-y-4 flex-1">
              <div>
                <Label htmlFor="lastPeriod">Last period start date</Label>
                <Input
                  id="lastPeriod"
                  type="date"
                  value={data.lastPeriodDate}
                  onChange={(e) => setData({ ...data, lastPeriodDate: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}

        {step === 'cycleLength' && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Average cycle length?
            </h2>
            <p className="text-muted-foreground mb-6">
              From the first day of one period to the first day of the next.
            </p>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setData({ ...data, averageCycleLength: Math.max(21, data.averageCycleLength - 1) })}
                >
                  -
                </Button>
                <div className="text-center">
                  <span className="text-5xl font-bold text-primary">{data.averageCycleLength}</span>
                  <p className="text-muted-foreground">days</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setData({ ...data, averageCycleLength: Math.min(40, data.averageCycleLength + 1) })}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Most cycles are between 21-35 days
              </p>
            </div>
          </div>
        )}

        {step === 'periodLength' && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              How long does your period last?
            </h2>
            <p className="text-muted-foreground mb-6">
              Average number of days you experience bleeding.
            </p>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setData({ ...data, averagePeriodLength: Math.max(2, data.averagePeriodLength - 1) })}
                >
                  -
                </Button>
                <div className="text-center">
                  <span className="text-5xl font-bold text-primary">{data.averagePeriodLength}</span>
                  <p className="text-muted-foreground">days</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setData({ ...data, averagePeriodLength: Math.min(10, data.averagePeriodLength + 1) })}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Typically between 3-7 days
              </p>
            </div>
          </div>
        )}

        {step === 'goal' && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              What's your goal?
            </h2>
            <p className="text-muted-foreground mb-6">
              We'll personalize your experience based on your needs.
            </p>
            <div className="space-y-3 flex-1">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all border-2 ${
                    data.goal === goal.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setData({ ...data, goal: goal.id })}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <span className="text-3xl">{goal.emoji}</span>
                    <div>
                      <p className="font-semibold text-foreground">{goal.label}</p>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        {step !== 'welcome' && (
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={goBack} className="flex-1">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Button>
            <Button onClick={goNext} className="flex-1">
              {step === 'goal' ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
