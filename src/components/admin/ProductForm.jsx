import { useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectCategories } from '@/store/slices/categorySlice';
import { Input, Select, Textarea, Button } from '@/components/common';

const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
];

export default function ProductForm({ initialValues, onSubmit, submitLabel = 'Save product' }) {
  const categories = useSelector(selectCategories);
  const [form, setForm] = useState({
    name: '', description: '', categoryId: categories[0]?.id || '', price: '', discountPrice: '',
    stock: '', sku: '', status: 'ACTIVE', images: [],
    ...initialValues,
  });
  const [saving, setSaving] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
  };

  const removeImage = (idx) => setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSubmit?.(form);
    }, 700);
  };

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <section className="rounded-card border border-paper-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">General information</h2>
          <div className="mt-5 flex flex-col gap-4">
            <Input label="Product name" required value={form.name} onChange={update('name')} />
            <Textarea label="Description" rows={5} value={form.description} onChange={update('description')} />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Category" options={categoryOptions.length ? categoryOptions : [{ value: '', label: 'No categories' }]} value={form.categoryId} onChange={update('categoryId')} />
              <Input label="SKU" required value={form.sku} onChange={update('sku')} />
            </div>
          </div>
        </section>

        <section className="rounded-card border border-paper-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">Pricing & inventory</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Input label="Price" type="number" step="0.01" required value={form.price} onChange={update('price')} />
            <Input label="Discount price" type="number" step="0.01" value={form.discountPrice} onChange={update('discountPrice')} />
            <Input label="Stock quantity" type="number" required value={form.stock} onChange={update('stock')} />
          </div>
        </section>

        <section className="rounded-card border border-paper-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">Images</h2>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {form.images.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-paper-dim">
                <img src={img} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  aria-label="Remove image"
                  className="absolute right-1 top-1 rounded-full bg-ink/70 p-1 text-paper hover:bg-ink"
                >
                  <XMarkIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-paper-line text-ink/40 hover:border-accent hover:text-accent-dark">
              <PhotoIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Add image</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageAdd} />
            </label>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-6">
        <section className="rounded-card border border-paper-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">Status</h2>
          <div className="mt-4">
            <Select options={STATUS_OPTIONS} value={form.status} onChange={update('status')} />
          </div>
          <Button type="submit" variant="primary" size="lg" isLoading={saving} className="mt-6 w-full">
            {submitLabel}
          </Button>
        </section>
      </div>
    </form>
  );
}
