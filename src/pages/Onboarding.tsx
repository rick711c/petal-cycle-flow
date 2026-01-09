import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
  const progressValue = ((currentIndex) / (steps.length - 1)) * 100;

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
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'md',
        mx: 'auto',
      }}
    >
      {/* Header with image */}
      <Box sx={{ position: 'relative', height: 192, overflow: 'hidden' }}>
        <Box
          component="img"
          src={heroFlowers}
          alt="Floral background"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent, hsl(240, 4%, 95%))',
          }}
        />
        <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalFloristIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight={700} color="text.primary">
              Flora
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Progress */}
      {step !== 'welcome' && (
        <Box sx={{ px: 3, py: 2 }}>
          <LinearProgress variant="determinate" value={progressValue} sx={{ height: 6, borderRadius: 3 }} />
        </Box>
      )}

      {/* Content */}
      <Box sx={{ flex: 1, px: 3, py: 2, display: 'flex', flexDirection: 'column' }}>
        {step === 'welcome' && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              Welcome to Flora
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Your personal cycle companion. Let's set up your profile to give you accurate predictions.
            </Typography>
            <Button
              onClick={goNext}
              variant="contained"
              size="large"
              fullWidth
              endIcon={<ChevronRightIcon />}
            >
              Get Started
            </Button>
          </Box>
        )}

        {step === 'lastPeriod' && (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
              When did your last period start?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              This helps us predict your cycle accurately.
            </Typography>
            <TextField
              label="Last period start date"
              type="date"
              value={data.lastPeriodDate}
              onChange={(e) => setData({ ...data, lastPeriodDate: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}

        {step === 'cycleLength' && (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
              Average cycle length?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              From the first day of one period to the first day of the next.
            </Typography>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <IconButton
                  onClick={() =>
                    setData({ ...data, averageCycleLength: Math.max(21, data.averageCycleLength - 1) })
                  }
                  sx={{ border: 1, borderColor: 'divider' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" fontWeight={700} color="primary.main">
                    {data.averageCycleLength}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    days
                  </Typography>
                </Box>
                <IconButton
                  onClick={() =>
                    setData({ ...data, averageCycleLength: Math.min(40, data.averageCycleLength + 1) })
                  }
                  sx={{ border: 1, borderColor: 'divider' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                Most cycles are between 21-35 days
              </Typography>
            </Box>
          </Box>
        )}

        {step === 'periodLength' && (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
              How long does your period last?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Average number of days you experience bleeding.
            </Typography>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <IconButton
                  onClick={() =>
                    setData({ ...data, averagePeriodLength: Math.max(2, data.averagePeriodLength - 1) })
                  }
                  sx={{ border: 1, borderColor: 'divider' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" fontWeight={700} color="primary.main">
                    {data.averagePeriodLength}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    days
                  </Typography>
                </Box>
                <IconButton
                  onClick={() =>
                    setData({ ...data, averagePeriodLength: Math.min(10, data.averagePeriodLength + 1) })
                  }
                  sx={{ border: 1, borderColor: 'divider' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                Typically between 3-7 days
              </Typography>
            </Box>
          </Box>
        )}

        {step === 'goal' && (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
              What's your goal?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We'll personalize your experience based on your needs.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  onClick={() => setData({ ...data, goal: goal.id })}
                  sx={{
                    cursor: 'pointer',
                    border: 2,
                    borderColor: data.goal === goal.id ? 'primary.main' : 'divider',
                    bgcolor: data.goal === goal.id ? 'rgba(211, 47, 126, 0.05)' : 'background.paper',
                    transition: 'all 0.2s',
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                    <Typography variant="h4">{goal.emoji}</Typography>
                    <Box>
                      <Typography variant="body1" fontWeight={600} color="text.primary">
                        {goal.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {goal.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Navigation */}
        {step !== 'welcome' && (
          <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
            <Button variant="outlined" onClick={goBack} sx={{ flex: 1 }} startIcon={<ChevronLeftIcon />}>
              Back
            </Button>
            <Button variant="contained" onClick={goNext} sx={{ flex: 1 }} endIcon={<ChevronRightIcon />}>
              {step === 'goal' ? 'Complete' : 'Next'}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
