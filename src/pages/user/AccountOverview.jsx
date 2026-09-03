import { Link } from 'react-router-dom';
import { ClipboardDocumentListIcon, ClockIcon, CheckCircleIcon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { orders as mockOrders } from '@/data/orders';
import StatCard from '@/components/dashboard/StatCard';
import { OrderStatusBadge, Button } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';
import { formatCurrency, formatDate } from '@/utils/format';
import { ORDER_STATUS } from '@/constants';

export default function AccountOverview() {
  const { user } = useAuth();
  const myOrders = mockOrders.slice(0, 6);
  const pending = myOrders.filter((o) => [ORDER_STATUS.PENDING, ORDER_STATUS.PROCESSING].includes(o.status)).length;
  const completed = myOrders.filter((o) => o.status === ORDER_STATUS.DELIVERED).length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-xl text-ink">Welcome back, {user?.name?.split(' ')[0] || 'there'}</h2>
        <p className="mt-1 text-sm text-ink/55">Here's a snapshot of your account activity.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total orders" value={myOrders.length} icon={ClipboardDocumentListIcon} tone="accent" />
        <StatCard label="Pending" value={pending} icon={ClockIcon} tone="warning" />
        <StatCard label="Completed" value={completed} icon={CheckCircleIcon} tone="success" />
        <StatCard label="Wishlist items" value={3} icon={HeartIcon} tone="neutral" />
      </div>

      <div className="rounded-card border border-paper-line bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-ink">Recent orders</h3>
          <Link to={ROUTES.ACCOUNT_ORDERS} className="flex items-center gap-1 text-sm font-medium text-ink/55 hover:text-ink">
            View all <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 divide-y divide-paper-line">
          {myOrders.slice(0, 4).map((order) => (
            <Link
              key={order.id}
              to={buildRoute(ROUTES.ACCOUNT_ORDER_DETAILS, { id: order.id })}
              className="flex items-center justify-between gap-3 py-3.5 hover:bg-paper-dim/30 -mx-2 px-2 rounded-md transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-ink">{order.id}</p>
                <p className="text-xs text-ink/45">{formatDate(order.date)} · {order.items.length} item(s)</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-ink">{formatCurrency(order.total)}</span>
                <OrderStatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
