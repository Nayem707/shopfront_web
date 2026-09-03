import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { Input, Button, ConfirmDialog } from '@/components/common';
import { ROUTES } from '@/constants/routes';

function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="text-xs text-ink/45">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-paper-line'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </label>
  );
}

export default function Settings() {
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [notifications, setNotifications] = useState({ orderUpdates: true, promotions: false, newArrivals: true });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.next !== passwordForm.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password changed');
    setPasswordForm({ current: '', next: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    dispatch(logout());
    toast.info('Account deleted');
    setDeleteOpen(false);
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-card border border-paper-line bg-white p-6">
        <h2 className="font-display text-xl text-ink">Change password</h2>
        <form onSubmit={handlePasswordSubmit} className="mt-5 flex flex-col gap-4 max-w-sm">
          <Input label="Current password" type="password" value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} />
          <Input label="New password" type="password" value={passwordForm.next} onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })} />
          <Input label="Confirm new password" type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })} />
          <Button type="submit" variant="primary" className="self-start">Update password</Button>
        </form>
      </div>

      <div className="rounded-card border border-paper-line bg-white p-6">
        <h2 className="font-display text-xl text-ink">Notification preferences</h2>
        <div className="mt-2 divide-y divide-paper-line">
          <Toggle
            label="Order updates"
            description="Shipping and delivery notifications"
            checked={notifications.orderUpdates}
            onChange={(v) => setNotifications({ ...notifications, orderUpdates: v })}
          />
          <Toggle
            label="Promotions"
            description="Sales, discounts, and offers"
            checked={notifications.promotions}
            onChange={(v) => setNotifications({ ...notifications, promotions: v })}
          />
          <Toggle
            label="New arrivals"
            description="Be first to know about new drops"
            checked={notifications.newArrivals}
            onChange={(v) => setNotifications({ ...notifications, newArrivals: v })}
          />
        </div>
      </div>

      <div className="rounded-card border border-error/25 bg-error-soft p-6">
        <h2 className="font-display text-xl text-ink">Delete account</h2>
        <p className="mt-1.5 max-w-md text-sm text-ink/60">
          This will permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button variant="danger" size="sm" className="mt-4" onClick={() => setDeleteOpen(true)}>
          Delete my account
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete your account?"
        description="This is permanent and cannot be undone."
        confirmLabel="Delete account"
      />
    </div>
  );
}
