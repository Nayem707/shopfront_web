import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CameraIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { updateProfile } from '@/store/slices/authSlice';
import { useToast } from '@/hooks/useToast';
import { Input, Button } from '@/components/common';

export default function Profile() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const toast = useToast();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      dispatch(updateProfile(form));
      setSaving(false);
      toast.success('Profile updated');
    }, 600);
  };

  return (
    <div className="rounded-card border border-paper-line bg-white p-6">
      <h2 className="font-display text-xl text-ink">Profile</h2>
      <p className="mt-1 text-sm text-ink/55">Update your personal information.</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative">
          <img
            src={user?.avatar || 'https://i.pravatar.cc/150?img=12'}
            alt=""
            className="h-20 w-20 rounded-full object-cover"
          />
          <button
            type="button"
            aria-label="Change profile image"
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-ink text-paper hover:bg-ink-soft"
          >
            <CameraIcon className="h-4 w-4" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">Profile photo</p>
          <p className="text-xs text-ink/45">JPG or PNG, up to 5MB.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
        <div className="sm:col-span-2">
          <Button type="submit" variant="primary" isLoading={saving}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
