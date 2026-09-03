import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, TagIcon } from '@heroicons/react/24/outline';
import { categories as mockCategories } from '@/data/categories';
import { Table, Button, Modal, Input, Badge, EmptyState, ConfirmDialog } from '@/components/common';
import { useToast } from '@/hooks/useToast';

export default function AdminCategoryList() {
  const [categories, setCategories] = useState(mockCategories.map((c) => ({ ...c, status: 'ACTIVE' })));
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ name: '', image: '' });
  const toast = useToast();

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', image: '' });
    setModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, image: cat.image });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setCategories((list) => list.map((c) => (c.id === editing.id ? { ...c, ...form } : c)));
      toast.success('Category updated');
    } else {
      setCategories((list) => [
        ...list,
        { id: `cat-${Date.now()}`, ...form, productCount: 0, status: 'ACTIVE', slug: form.name.toLowerCase().replace(/\s+/g, '-') },
      ]);
      toast.success('Category created');
    }
    setModalOpen(false);
  };

  const toggleStatus = (id) => {
    setCategories((list) => list.map((c) => (c.id === id ? { ...c, status: c.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : c)));
  };

  const handleDelete = () => {
    setCategories((list) => list.filter((c) => c.id !== deleteId));
    toast.success('Category deleted');
    setDeleteId(null);
  };

  const columns = [
    {
      key: 'category', header: 'Category',
      render: (c) => (
        <div className="flex items-center gap-3">
          <img src={c.image} alt="" className="h-11 w-11 flex-shrink-0 rounded-lg object-cover" />
          <span className="text-sm font-medium text-ink">{c.name}</span>
        </div>
      ),
    },
    { key: 'productCount', header: 'Products', render: (c) => `${c.productCount} items` },
    {
      key: 'status', header: 'Status',
      render: (c) => (
        <button onClick={() => toggleStatus(c.id)}>
          <Badge tone={c.status === 'ACTIVE' ? 'success' : 'neutral'}>{c.status === 'ACTIVE' ? 'Active' : 'Inactive'}</Badge>
        </button>
      ),
    },
    {
      key: 'actions', header: '',
      render: (c) => (
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => openEdit(c)} aria-label="Edit" className="rounded-full p-1.5 text-ink/50 hover:bg-paper-dim hover:text-ink">
            <PencilIcon className="h-4 w-4" />
          </button>
          <button onClick={() => setDeleteId(c.id)} aria-label="Delete" className="rounded-full p-1.5 text-ink/50 hover:bg-error-soft hover:text-error">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-ink">Categories</h1>
          <p className="mt-1 text-sm text-ink/50">{categories.length} categories</p>
        </div>
        <Button variant="primary" icon={PlusIcon} onClick={openCreate}>Add category</Button>
      </div>

      <Table
        columns={columns}
        data={categories}
        emptyState={<EmptyState icon={TagIcon} title="No categories yet" description="Create your first category to organize products." />}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit category' : 'Add category'}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input label="Category name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Image URL" required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://…" />
          <Button type="submit" variant="primary" className="mt-2">
            {editing ? 'Save changes' : 'Create category'}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete category?"
        description="Products in this category will need to be reassigned."
        confirmLabel="Delete"
      />
    </div>
  );
}
