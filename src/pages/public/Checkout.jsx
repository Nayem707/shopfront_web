import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TruckIcon, BanknotesIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { selectCartItems, selectCartSubtotal, clearCart } from '@/store/slices/cartSlice';
import { useToast } from '@/hooks/useToast';
import { Breadcrumb, Input, Select, Button, PriceDisplay } from '@/components/common';
import { ROUTES } from '@/constants/routes';
import { formatCurrency } from '@/utils/format';
import { PAYMENT_METHOD } from '@/constants';
import { cn } from '@/utils/cn';

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'AU', label: 'Australia' },
];

export default function Checkout() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '', phone: '', address: '', city: '', postalCode: '', country: 'US',
  });
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.COD);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 12;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      dispatch(clearCart());
    }, 900);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft">
          <CheckCircleIcon className="h-8 w-8 text-success" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink">Order placed</h1>
        <p className="mt-2 text-sm text-ink/55">
          Thanks, {form.fullName.split(' ')[0] || 'friend'} — a confirmation has been prepared and your order is now pending review.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button as={Link} to={ROUTES.ACCOUNT_ORDERS} variant="primary">View my orders</Button>
          <Button as={Link} to={ROUTES.PRODUCTS} variant="outline">Continue shopping</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl text-ink">Nothing to check out</h1>
        <p className="mt-2 text-sm text-ink/55">Your cart is empty right now.</p>
        <Button as={Link} to={ROUTES.PRODUCTS} variant="primary" className="mt-6">Shop products</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'Cart', to: ROUTES.CART }, { label: 'Checkout' }]} />
      <h1 className="mt-2 font-display text-3xl text-ink">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Shipping */}
          <section className="rounded-card border border-paper-line bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <TruckIcon className="h-5 w-5 text-accent-dark" />
              <h2 className="font-display text-lg text-ink">Shipping information</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Full name" required value={form.fullName} onChange={update('fullName')} containerClassName="sm:col-span-2" />
              <Input label="Phone" type="tel" required value={form.phone} onChange={update('phone')} />
              <Select label="Country" options={COUNTRIES} value={form.country} onChange={update('country')} />
              <Input label="Address" required value={form.address} onChange={update('address')} containerClassName="sm:col-span-2" />
              <Input label="City" required value={form.city} onChange={update('city')} />
              <Input label="Postal code" required value={form.postalCode} onChange={update('postalCode')} />
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-card border border-paper-line bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <CreditCardIcon className="h-5 w-5 text-accent-dark" />
              <h2 className="font-display text-lg text-ink">Payment method</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod(PAYMENT_METHOD.COD)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors',
                  paymentMethod === PAYMENT_METHOD.COD ? 'border-ink bg-paper-dim/50' : 'border-paper-line hover:border-ink/30'
                )}
              >
                <BanknotesIcon className="h-6 w-6 text-ink/60" />
                <div>
                  <p className="text-sm font-medium text-ink">Cash on delivery</p>
                  <p className="text-xs text-ink/45">Pay when your order arrives</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod(PAYMENT_METHOD.ONLINE)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors',
                  paymentMethod === PAYMENT_METHOD.ONLINE ? 'border-ink bg-paper-dim/50' : 'border-paper-line hover:border-ink/30'
                )}
              >
                <CreditCardIcon className="h-6 w-6 text-ink/60" />
                <div>
                  <p className="text-sm font-medium text-ink">Online payment</p>
                  <p className="text-xs text-ink/45">Card checkout at next step</p>
                </div>
              </button>
            </div>
          </section>

          {/* Order items */}
          <section className="rounded-card border border-paper-line bg-white p-5 sm:p-6">
            <h2 className="font-display text-lg text-ink">Order items</h2>
            <div className="mt-4 divide-y divide-paper-line">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-3 py-3">
                  <div className="h-14 w-12 flex-shrink-0 overflow-hidden rounded-md bg-paper-dim">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink/45">Qty {item.quantity}</p>
                  </div>
                  <span className="font-mono text-sm text-ink">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
          <div className="sticky top-24 rounded-card border border-paper-line bg-white p-5">
            <h3 className="font-display text-lg text-ink">Order summary</h3>
            <div className="mt-4 flex flex-col gap-2.5 font-mono text-sm">
              <div className="flex justify-between text-ink/65"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-ink/65"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
            </div>
            <div className="ticket-divider mt-4 flex justify-between pt-4 font-mono text-base font-semibold text-ink">
              <span>Total</span><span>{formatCurrency(total)}</span>
            </div>
            <Button type="submit" variant="primary" size="lg" isLoading={placing} className="mt-5 w-full">
              Place order
            </Button>
            <p className="mt-3 text-center text-xs text-ink/40">By placing your order you agree to our terms of sale.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
