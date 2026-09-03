import { useState } from 'react';
import { PlusIcon, MapPinIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Modal, Input, Select, Badge, EmptyState, ConfirmDialog } from '@/components/common';
import { useToast } from '@/hooks/useToast';

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'BD', label: 'Bangladesh' },
];

const initialAddresses = [
  {
    id: 'addr-1', label: 'Home', isDefault: true, fullName: 'Jordan Blake', phone: '+1 (555) 010-0198',
    address: '128 Harbor View Lane', city: 'Portland', postalCode: '97201', country: 'US',
  },
  {
    id: 'addr-2', label: 'Office', isDefault: false, fullName: 'Jordan Blake', phone: '+1 (555) 271-4420',
    address: '900 Pearl District Ave, Suite 4B', city: 'Portland', postalCode: '97209', country: 'US',
  },
];

export default function Addresses() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ label: '', fullName: '', phone: '', address: '', city: '', postalCode: '', country: 'US' });
  const toast = useToast();

  const openCreate = () => {
    setEditing(null);
    setForm({ label: '', fullName: '', phone: '', address: '', city: '', postalCode: '', country: 'US' });
    setModalOpen(true);
  };

  const openEdit = (addr) => {
    setEditing(addr);
    setForm(addr);
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setAddresses((list) => list.map((a) => (a.id === editing.id ? { ...form, id: editing.id, isDefault: editing.isDefault } : a)));
      toast.success('Address updated');
    } else {
      setAddresses((list) => [...list, { ...form, id: `addr-${Date.now()}`, isDefault: list.length === 0 }]);
      toast.success('Address added');
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    setAddresses((list) => list.filter((a) => a.id !== deleteId));
    toast.info('Address removed');
    setDeleteId(null);
  };

  return (
    <div className="rounded-card border border-paper-line bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-ink">Saved addresses</h2>
        <Button variant="primary" size="sm" icon={PlusIcon} onClick={openCreate}>
          Add address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon={MapPinIcon} title="No addresses saved" description="Add an address to speed up checkout." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div key={addr.id} className="rounded-card border border-paper-line p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">{addr.label}</span>
                {addr.isDefault && <Badge tone="accent">Default</Badge>}
              </div>
              <p className="mt-2 text-sm text-ink/70">{addr.fullName}</p>
              <p className="text-sm text-ink/50">{addr.address}</p>
              <p className="text-sm text-ink/50">{addr.city}, {addr.postalCode}</p>
              <p className="text-sm text-ink/50">{addr.phone}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => openEdit(addr)} className="flex items-center gap-1 text-xs font-medium text-ink/55 hover:text-ink">
                  <PencilIcon className="h-3.5 w-3.5" /> Edit
                </button>
                <button onClick={() => setDeleteId(addr.id)} className="flex items-center gap-1 text-xs font-medium text-error/80 hover:text-error">
                  <TrashIcon className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit address' : 'Add address'}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input label="Label" placeholder="Home, Office…" required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          <Input label="Full name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <Input label="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <Input label="Postal code" required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
          </div>
          <Select label="Country" options={COUNTRIES} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          <Button type="submit" variant="primary" className="mt-2">
            {editing ? 'Save changes' : 'Add address'}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove address?"
        description="This address will be permanently removed from your account."
        confirmLabel="Remove"
      />
    </div>
  );
}
