import { useState } from 'react';
import { format } from 'date-fns';
import { Check, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCycleStore } from '@/hooks/useCycleStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { FlowIntensity, Mood, PhysicalSymptom, DayLog } from '@/types/cycle';

const flowOptions: { id: FlowIntensity; label: string; icon: string }[] = [
  { id: 'spotting', label: 'Spotting', icon: '💧' },
  { id: 'light', label: 'Light', icon: '🩸' },
  { id: 'medium', label: 'Medium', icon: '🩸🩸' },
  { id: 'heavy', label: 'Heavy', icon: '🩸🩸🩸' },
];

const moodOptions: { id: Mood; label: string; emoji: string }[] = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡' },
  { id: 'sensitive', label: 'Sensitive', emoji: '🥺' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'irritable', label: 'Irritable', emoji: '😤' },
];

const symptomOptions: { id: PhysicalSymptom; label: string; emoji: string }[] = [
  { id: 'cramps', label: 'Cramps', emoji: '🤕' },
  { id: 'headache', label: 'Headache', emoji: '🤯' },
  { id: 'bloating', label: 'Bloating', emoji: '🎈' },
  { id: 'breast_tenderness', label: 'Breast Tenderness', emoji: '💗' },
  { id: 'acne', label: 'Acne', emoji: '😖' },
  { id: 'fatigue', label: 'Fatigue', emoji: '😴' },
  { id: 'backache', label: 'Backache', emoji: '🦴' },
  { id: 'nausea', label: 'Nausea', emoji: '🤢' },
];

export default function LogPage() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const { getDayLog, addDayLog } = useCycleStore();
  const existingLog = getDayLog(today);

  const [log, setLog] = useState<DayLog>(
    existingLog || {
      date: today,
      isPeriod: false,
      moods: [],
      symptoms: [],
      notes: '',
    }
  );

  const toggleMood = (mood: Mood) => {
    setLog((prev) => ({
      ...prev,
      moods: prev.moods.includes(mood)
        ? prev.moods.filter((m) => m !== mood)
        : [...prev.moods, mood],
    }));
  };

  const toggleSymptom = (symptom: PhysicalSymptom) => {
    setLog((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleSave = () => {
    addDayLog(log);
    toast.success('Log saved!', {
      description: 'Your daily log has been recorded.',
    });
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Log Today</h1>
          <p className="text-muted-foreground">
            {format(new Date(), 'EEEE, MMMM d')}
          </p>
        </div>

        {/* Flow Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Flow</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {flowOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    setLog((prev) => ({
                      ...prev,
                      isPeriod: true,
                      flowIntensity: prev.flowIntensity === option.id ? undefined : option.id,
                    }))
                  }
                  className={cn(
                    'flex flex-col items-center p-3 rounded-xl transition-all',
                    log.flowIntensity === option.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 hover:bg-muted'
                  )}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-xs mt-1 font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mood Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">How are you feeling?</h3>
            <div className="grid grid-cols-3 gap-2">
              {moodOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleMood(option.id)}
                  className={cn(
                    'flex flex-col items-center p-3 rounded-xl transition-all',
                    log.moods.includes(option.id)
                      ? 'bg-accent text-accent-foreground ring-2 ring-primary'
                      : 'bg-muted/50 hover:bg-muted'
                  )}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-xs mt-1 font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Symptoms Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Symptoms</h3>
            <div className="grid grid-cols-4 gap-2">
              {symptomOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleSymptom(option.id)}
                  className={cn(
                    'flex flex-col items-center p-2 rounded-xl transition-all',
                    log.symptoms.includes(option.id)
                      ? 'bg-accent text-accent-foreground ring-2 ring-primary'
                      : 'bg-muted/50 hover:bg-muted'
                  )}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className="text-[10px] mt-1 font-medium text-center leading-tight">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Notes</h3>
            <Textarea
              placeholder="How was your day? Any other symptoms or thoughts..."
              value={log.notes}
              onChange={(e) => setLog((prev) => ({ ...prev, notes: e.target.value }))}
              className="min-h-[100px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full h-14 text-lg font-semibold">
          <Check className="w-5 h-5 mr-2" />
          Save Log
        </Button>
      </div>
    </MobileLayout>
  );
}
