import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { orders as mockOrders } from '@/data/orders';
import { Table, OrderStatusBadge, Tabs, EmptyState, Button } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';
import { formatCurrency, formatDate } from '@/utils/format';
import { ORDER_STATUS } from '@/constants';

const TABS = [
  { label: 'All orders', value: 'ALL' },
  { label: 'Pending', value: ORDER_STATUS.PENDING },
  { label: 'Processing', value: ORDER_STATUS.PROCESSING },
  { label: 'Delivered', value: ORDER_STATUS.DELIVERED },
  { label: 'Cancelled', value: ORDER_STATUS.CANCELLED },
];

export default function Orders() {
  const [tab, setTab] = useState('ALL');
  const filtered = tab === 'ALL' ? mockOrders : mockOrders.filter((o) => o.status === tab);

  const columns = [
    { key: 'id', header: 'Order ID', render: (o) => <span className="font-mono text-xs font-medium">{o.id}</span> },
    { key: 'date', header: 'Date', render: (o) => formatDate(o.date) },
    { key: 'items', header: 'Items', render: (o) => `${o.items.length} item(s)` },
    { key: 'total', header: 'Total', render: (o) => <span className="font-mono">{formatCurrency(o.total)}</span> },
    { key: 'paymentStatus', header: 'Payment', render: (o) => o.paymentStatus },
    { key: 'status', header: 'Status', render: (o) => <OrderStatusBadge status={o.status} /> },
    {
      key: 'actions',
      header: '',
      render: (o) => (
        <Link to={buildRoute(ROUTES.ACCOUNT_ORDER_DETAILS, { id: o.id })} className="text-sm font-medium text-accent-dark hover:underline">
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="rounded-card border border-paper-line bg-white">
      <div className="px-5 pt-5">
        <h2 className="font-display text-xl text-ink">Order history</h2>
      </div>
      <Tabs tabs={TABS} active={tab} onChange={setTab} className="mt-4 px-5" />
      <div className="p-5">
        <Table
          columns={columns}
          data={filtered}
          emptyState={
            <EmptyState
              icon={ClipboardDocumentListIcon}
              title="No orders here"
              description="Orders matching this filter will show up here."
              actionLabel="Browse products"
              actionTo={ROUTES.PRODUCTS}
            />
          }
        />
      </div>
    </div>
  );
}
