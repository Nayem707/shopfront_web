import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { orders as mockOrders } from '@/data/orders';
import { Table, Select, SearchBar, OrderStatusBadge, Badge, EmptyState, Pagination } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';
import { formatCurrency, formatDate } from '@/utils/format';
import { ORDER_STATUS } from '@/constants';

const PAGE_SIZE = 8;

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All statuses' },
  ...Object.values(ORDER_STATUS).map((s) => ({ value: s, label: s.charAt(0) + s.slice(1).toLowerCase() })),
];

export default function AdminOrderList() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return mockOrders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'ALL' || o.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const columns = [
    { key: 'id', header: 'Order ID', render: (o) => <span className="font-mono text-xs font-medium">{o.id}</span> },
    { key: 'customer', header: 'Customer', render: (o) => o.customer.name },
    { key: 'date', header: 'Date', render: (o) => formatDate(o.date) },
    { key: 'total', header: 'Total', render: (o) => <span className="font-mono">{formatCurrency(o.total)}</span> },
    {
      key: 'paymentStatus', header: 'Payment',
      render: (o) => <Badge tone={o.paymentStatus === 'PAID' ? 'success' : o.paymentStatus === 'PENDING' ? 'warning' : 'error'}>{o.paymentStatus}</Badge>,
    },
    { key: 'status', header: 'Status', render: (o) => <OrderStatusBadge status={o.status} /> },
    {
      key: 'actions', header: '',
      render: (o) => (
        <Link to={buildRoute(ROUTES.ADMIN_ORDER_DETAILS, { id: o.id })} aria-label="View order" className="inline-flex rounded-full p-1.5 text-ink/50 hover:bg-paper-dim hover:text-ink">
          <EyeIcon className="h-4 w-4" />
        </Link>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl text-ink">Orders</h1>
        <p className="mt-1 text-sm text-ink/50">{filtered.length} orders</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search order ID or customer…" className="max-w-xs" />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} options={STATUS_OPTIONS} className="w-48" />
      </div>

      <Table
        columns={columns}
        data={paginated}
        emptyState={<EmptyState icon={ClipboardDocumentListIcon} title="No orders found" description="Try a different search or filter." />}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
