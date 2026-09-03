import { Link, useParams } from 'react-router-dom';
import { getOrderById } from '@/data/orders';
import OrderTimeline from '@/components/order/OrderTimeline';
import { Breadcrumb, OrderStatusBadge, Badge, Button } from '@/components/common';
import { ROUTES } from '@/constants/routes';
import { formatCurrency, formatDate } from '@/utils/format';

export default function OrderDetails() {
  const { id } = useParams();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="rounded-card border border-paper-line bg-white p-10 text-center">
        <h2 className="font-display text-xl text-ink">Order not found</h2>
        <Button as={Link} to={ROUTES.ACCOUNT_ORDERS} variant="primary" className="mt-5">
          Back to orders
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Breadcrumb items={[{ label: 'Orders', to: ROUTES.ACCOUNT_ORDERS }, { label: order.id }]} />
          <h2 className="mt-1.5 font-display text-2xl text-ink">Order {order.id}</h2>
          <p className="text-sm text-ink/50">Placed on {formatDate(order.date)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="rounded-card border border-paper-line bg-white p-6">
        <h3 className="font-display text-lg text-ink">Order tracking</h3>
        <div className="mt-6">
          <OrderTimeline status={order.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-card border border-paper-line bg-white p-6 lg:col-span-2">
          <h3 className="font-display text-lg text-ink">Products</h3>
          <div className="mt-4 divide-y divide-paper-line">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5">
                <div className="h-16 w-14 flex-shrink-0 overflow-hidden rounded-md bg-paper-dim">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="text-xs text-ink/45">Qty {item.quantity}</p>
                </div>
                <span className="font-mono text-sm text-ink">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="ticket-divider mt-4 flex flex-col gap-2 pt-4 font-mono text-sm">
            <div className="flex justify-between text-ink/60"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
            <div className="flex justify-between text-ink/60"><span>Shipping</span><span>{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatCurrency(order.discount)}</span></div>}
            <div className="flex justify-between font-semibold text-ink text-base"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-card border border-paper-line bg-white p-6">
            <h3 className="font-display text-base text-ink">Customer information</h3>
            <p className="mt-3 text-sm text-ink/70">{order.customer.name}</p>
            <p className="text-sm text-ink/50">{order.customer.email}</p>
          </div>
          <div className="rounded-card border border-paper-line bg-white p-6">
            <h3 className="font-display text-base text-ink">Shipping address</h3>
            <p className="mt-3 text-sm text-ink/70">{order.shippingAddress.fullName}</p>
            <p className="text-sm text-ink/50">{order.shippingAddress.address}</p>
            <p className="text-sm text-ink/50">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p className="text-sm text-ink/50">{order.shippingAddress.country}</p>
            <p className="mt-2 text-sm text-ink/50">{order.shippingAddress.phone}</p>
          </div>
          <div className="rounded-card border border-paper-line bg-white p-6">
            <h3 className="font-display text-base text-ink">Payment</h3>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-ink/60">Method</span>
              <span className="text-sm font-medium text-ink">{order.paymentMethod === 'COD' ? 'Cash on delivery' : 'Online payment'}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-ink/60">Status</span>
              <Badge tone={order.paymentStatus === 'PAID' ? 'success' : order.paymentStatus === 'PENDING' ? 'warning' : 'error'}>
                {order.paymentStatus}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
