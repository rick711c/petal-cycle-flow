import { Bell, Lock, Download, Trash2, ChevronRight, Moon, Flower2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCycleStore } from '@/hooks/useCycleStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { settings, updateSettings, setOnboarded } = useCycleStore();

  const handleReset = () => {
    localStorage.clear();
    setOnboarded(false);
    toast.success('Data cleared');
    navigate('/onboarding');
  };

  const settingsGroups = [
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Period Reminders',
          description: 'Get notified before your period',
          type: 'toggle' as const,
          value: settings.notificationsEnabled,
          onChange: () => updateSettings({ notificationsEnabled: !settings.notificationsEnabled }),
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          icon: Lock,
          label: 'App Lock',
          description: 'Require passcode to open',
          type: 'toggle' as const,
          value: false,
          onChange: () => toast.info('Coming soon!'),
        },
        {
          icon: Moon,
          label: 'Discreet Mode',
          description: 'Hide sensitive notifications',
          type: 'toggle' as const,
          value: false,
          onChange: () => toast.info('Coming soon!'),
        },
      ],
    },
    {
      title: 'Data',
      items: [
        {
          icon: Download,
          label: 'Export Data',
          description: 'Download your health data',
          type: 'link' as const,
          onClick: () => toast.info('Coming soon!'),
        },
        {
          icon: Trash2,
          label: 'Clear All Data',
          description: 'Delete all your data permanently',
          type: 'danger' as const,
          onClick: handleReset,
        },
      ],
    },
  ];

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </div>

        {/* Cycle Settings */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Cycle Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Cycle Length</p>
                  <p className="text-sm text-muted-foreground">Average days</p>
                </div>
                <span className="text-lg font-bold text-primary">{settings.averageCycleLength}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Period Length</p>
                  <p className="text-sm text-muted-foreground">Average days</p>
                </div>
                <span className="text-lg font-bold text-primary">{settings.averagePeriodLength}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Goal</p>
                  <p className="text-sm text-muted-foreground">Your tracking focus</p>
                </div>
                <span className="text-sm font-medium text-muted-foreground capitalize">{settings.goal}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <Card key={group.title} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-4">{group.title}</h3>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                    onClick={item.type === 'link' || item.type === 'danger' ? item.onClick : undefined}
                    role={item.type === 'link' || item.type === 'danger' ? 'button' : undefined}
                    tabIndex={item.type === 'link' || item.type === 'danger' ? 0 : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.type === 'danger' ? 'bg-destructive/10' : 'bg-muted'
                      }`}>
                        <item.icon className={`w-5 h-5 ${
                          item.type === 'danger' ? 'text-destructive' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <p className={`font-medium ${
                          item.type === 'danger' ? 'text-destructive' : 'text-foreground'
                        }`}>
                          {item.label}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    {item.type === 'toggle' && (
                      <Switch checked={item.value} onCheckedChange={item.onChange} />
                    )}
                    {(item.type === 'link' || item.type === 'danger') && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* App Info */}
        <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flower2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Flora</span>
          </div>
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">Your cycle, your data, your privacy.</p>
        </div>
      </div>
    </MobileLayout>
  );
}
