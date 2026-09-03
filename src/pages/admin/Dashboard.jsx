import { Link } from 'react-router-dom';
import {
  CurrencyDollarIcon, ShoppingBagIcon, CubeIcon, UsersIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { orders } from '@/data/orders';
import { users } from '@/data/users';
import { products } from '@/data/products';
import StatCard from '@/components/dashboard/StatCard';
import SalesChart from '@/components/admin/SalesChart';
import OrdersChart from '@/components/admin/OrdersChart';
import { OrderStatusBadge, Badge } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';
import { formatCurrency, formatDate } from '@/utils/format';
import { ORDER_STATUS } from '@/constants';

export default function AdminDashboard() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === ORDER_STATUS.PENDING).length;
  const completed = orders.filter((o) => o.status === ORDER_STATUS.DELIVERED).length;
  const recentOrders = orders.slice(0, 5);
  const recentUsers = users.slice(0, 5);
  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/50">
          Overview built from demo data — swap in live figures once the backend is connected.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total revenue" value={formatCurrency(totalRevenue)} icon={CurrencyDollarIcon} tone="accent" trend="+12.4%" />
        <StatCard label="Total orders" value={orders.length} icon={ShoppingBagIcon} tone="neutral" trend="+8.1%" />
        <StatCard label="Total products" value={products.length} icon={CubeIcon} tone="neutral" />
        <StatCard label="Total users" value={users.length} icon={UsersIcon} tone="neutral" trend="+4.6%" />
        <StatCard label="Pending orders" value={pending} icon={ClockIcon} tone="warning" />
        <StatCard label="Completed" value={completed} icon={CheckCircleIcon} tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-card border border-paper-line bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Revenue overview</h2>
            <Badge tone="accent">Last 7 months</Badge>
          </div>
          <SalesChart />
        </div>
        <div className="rounded-card border border-paper-line bg-white p-5">
          <h2 className="font-display text-lg text-ink">Orders this week</h2>
          <OrdersChart />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-card border border-paper-line bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Recent orders</h2>
            <Link to={ROUTES.ADMIN_ORDERS} className="flex items-center gap-1 text-sm font-medium text-ink/55 hover:text-ink">
              View all <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-3 divide-y divide-paper-line">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to={buildRoute(ROUTES.ADMIN_ORDER_DETAILS, { id: order.id })}
                className="flex items-center justify-between gap-3 py-3 hover:bg-paper-dim/30 -mx-2 px-2 rounded-md transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{order.id} · {order.customer.name}</p>
                  <p className="text-xs text-ink/45">{formatDate(order.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-ink">{formatCurrency(order.total)}</span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-paper-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Recent users</h2>
            <Link to={ROUTES.ADMIN_USERS} className="flex items-center gap-1 text-sm font-medium text-ink/55 hover:text-ink">
              View all <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-3 flex flex-col gap-3.5">
            {recentUsers.map((u) => (
              <Link key={u.id} to={buildRoute(ROUTES.ADMIN_USER_DETAILS, { id: u.id })} className="flex items-center gap-3 hover:bg-paper-dim/30 -mx-2 px-2 py-1 rounded-md transition-colors">
                <img src={u.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{u.name}</p>
                  <p className="truncate text-xs text-ink/45">{u.email}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-card border border-paper-line bg-white p-5">
        <h2 className="font-display text-lg text-ink">Top-selling products</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {topProducts.map((p) => (
            <Link key={p.id} to={buildRoute(ROUTES.ADMIN_PRODUCT_DETAILS, { id: p.id })} className="group">
              <div className="aspect-square overflow-hidden rounded-lg bg-paper-dim">
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <p className="mt-2 line-clamp-1 text-sm font-medium text-ink">{p.name}</p>
              <p className="text-xs text-ink/45">{p.reviewCount} reviews · {formatCurrency(p.discountPrice || p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
