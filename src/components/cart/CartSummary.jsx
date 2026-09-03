import { formatCurrency } from '@/utils/format';

export default function CartSummary({ subtotal, shipping = 0, discount = 0, children }) {
  const total = subtotal + shipping - discount;

  return (
    <div className="rounded-card border border-paper-line bg-white p-5">
      <h3 className="font-display text-lg text-ink">Order summary</h3>
      <div className="mt-4 flex flex-col gap-2.5 font-mono text-sm">
        <div className="flex justify-between text-ink/65">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-ink/65">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
      </div>
      <div className="ticket-divider mt-4 flex justify-between pt-4 font-mono text-base font-semibold text-ink">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      {children}
    </div>
  );
}
