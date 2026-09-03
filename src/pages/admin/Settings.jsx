import { useState } from 'react';
import { Input, Textarea, Button, Select } from '@/components/common';
import { useToast } from '@/hooks/useToast';

export default function AdminSettings() {
  const [store, setStore] = useState({
    name: 'Fernway', email: 'hello@fernway.com', supportPhone: '+1 (555) 010-0100',
    description: 'Considered essentials, made to be repaired rather than replaced.',
    currency: 'USD',
  });
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved');
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink/50">Manage your store's general configuration.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-card border border-paper-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">Store information</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Store name" value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} />
          <Input label="Support email" type="email" value={store.email} onChange={(e) => setStore({ ...store, email: e.target.value })} />
          <Input label="Support phone" value={store.supportPhone} onChange={(e) => setStore({ ...store, supportPhone: e.target.value })} />
          <Select
            label="Currency"
            value={store.currency}
            onChange={(e) => setStore({ ...store, currency: e.target.value })}
            options={[{ value: 'USD', label: 'USD — US Dollar' }, { value: 'EUR', label: 'EUR — Euro' }, { value: 'GBP', label: 'GBP — British Pound' }]}
          />
          <Textarea label="Store description" containerClassName="sm:col-span-2" rows={3} value={store.description} onChange={(e) => setStore({ ...store, description: e.target.value })} />
        </div>
        <Button type="submit" variant="primary" isLoading={saving} className="mt-6">
          Save settings
        </Button>
      </form>
    </div>
  );
}
