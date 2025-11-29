'use client';

import { SettingsForm } from '@/components/settings/settings-form';
import { Settings } from 'lucide-react';

function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Settings className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      <div className="max-w-2xl">
        <SettingsForm />
      </div>
    </div>
  );
}

export default SettingsPage;
