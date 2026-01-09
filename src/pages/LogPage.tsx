import { useState } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CheckIcon from '@mui/icons-material/Check';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCycleStore } from '@/hooks/useCycleStore';
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();
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
    enqueueSnackbar('Log saved! Your daily log has been recorded.', { variant: 'success' });
  };

  return (
    <MobileLayout>
      <Box sx={{ px: 2, pt: 3, pb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Log Today
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(new Date(), 'EEEE, MMMM d')}
          </Typography>
        </Box>

        {/* Flow Section */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <WaterDropIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="h6" fontWeight={600} color="text.primary">
                Flow
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
              {flowOptions.map((option) => (
                <Box
                  key={option.id}
                  onClick={() =>
                    setLog((prev) => ({
                      ...prev,
                      isPeriod: true,
                      flowIntensity: prev.flowIntensity === option.id ? undefined : option.id,
                    }))
                  }
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    bgcolor: log.flowIntensity === option.id ? 'primary.main' : 'action.hover',
                    color: log.flowIntensity === option.id ? 'primary.contrastText' : 'text.primary',
                    transition: 'all 0.2s',
                  }}
                >
                  <Typography variant="body1">{option.icon}</Typography>
                  <Typography variant="caption" fontWeight={500} sx={{ mt: 0.5 }}>
                    {option.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Mood Section */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
              How are you feeling?
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
              {moodOptions.map((option) => (
                <Box
                  key={option.id}
                  onClick={() => toggleMood(option.id)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    bgcolor: log.moods.includes(option.id) ? 'primary.light' : 'action.hover',
                    border: log.moods.includes(option.id) ? 2 : 0,
                    borderColor: 'primary.main',
                    transition: 'all 0.2s',
                  }}
                >
                  <Typography variant="h5">{option.emoji}</Typography>
                  <Typography variant="caption" fontWeight={500} sx={{ mt: 0.5 }}>
                    {option.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Symptoms Section */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
              Symptoms
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
              {symptomOptions.map((option) => (
                <Box
                  key={option.id}
                  onClick={() => toggleSymptom(option.id)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 2,
                    cursor: 'pointer',
                    bgcolor: log.symptoms.includes(option.id) ? 'primary.light' : 'action.hover',
                    border: log.symptoms.includes(option.id) ? 2 : 0,
                    borderColor: 'primary.main',
                    transition: 'all 0.2s',
                  }}
                >
                  <Typography variant="h6">{option.emoji}</Typography>
                  <Typography
                    variant="caption"
                    fontWeight={500}
                    sx={{ mt: 0.5, fontSize: 10, textAlign: 'center', lineHeight: 1.2 }}
                  >
                    {option.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 1.5 }}>
              Notes
            </Typography>
            <TextField
              placeholder="How was your day? Any other symptoms or thoughts..."
              value={log.notes}
              onChange={(e) => setLog((prev) => ({ ...prev, notes: e.target.value }))}
              multiline
              rows={4}
              fullWidth
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          variant="contained"
          size="large"
          fullWidth
          startIcon={<CheckIcon />}
          sx={{ height: 56, fontSize: '1.1rem', fontWeight: 600 }}
        >
          Save Log
        </Button>
      </Box>
    </MobileLayout>
  );
}
