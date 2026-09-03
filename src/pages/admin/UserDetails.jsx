import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserById } from '@/data/users';
import { orders as mockOrders } from '@/data/orders';
import { Breadcrumb, Badge, Button, OrderStatusBadge, Table, EmptyState } from '@/components/common';
import { useToast } from '@/hooks/useToast';
import { ROUTES } from '@/constants/routes';
import { formatDate, formatCurrency } from '@/utils/format';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export default function AdminUserDetails() {
  const { id } = useParams();
  const user = getUserById(id);
  const toast = useToast();
  const [status, setStatus] = useState(user?.status);

  if (!user) {
    return (
      <div className="rounded-card border border-paper-line bg-white p-10 text-center">
        <h2 className="font-display text-xl text-ink">User not found</h2>
        <Button as={Link} to={ROUTES.ADMIN_USERS} variant="primary" className="mt-5">Back to users</Button>
      </div>
    );
  }

  const userOrders = mockOrders.slice(0, user.ordersCount > 5 ? 5 : user.ordersCount);

  const columns = [
    { key: 'id', header: 'Order ID', render: (o) => <span className="font-mono text-xs">{o.id}</span> },
    { key: 'date', header: 'Date', render: (o) => formatDate(o.date) },
    { key: 'total', header: 'Total', render: (o) => <span className="font-mono">{formatCurrency(o.total)}</span> },
    { key: 'status', header: 'Status', render: (o) => <OrderStatusBadge status={o.status} /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Users', to: ROUTES.ADMIN_USERS }, { label: user.name }]} />

      <div className="rounded-card border border-paper-line bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <h1 className="font-display text-xl text-ink">{user.name}</h1>
              <p className="text-sm text-ink/50">{user.email}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge tone={user.role === 'ADMIN' ? 'accent' : 'neutral'}>{user.role}</Badge>
                <Badge tone={status === 'ACTIVE' ? 'success' : 'neutral'}>{status === 'ACTIVE' ? 'Active' : 'Inactive'}</Badge>
              </div>
            </div>
          </div>
          <Button
            variant={status === 'ACTIVE' ? 'danger' : 'primary'}
            onClick={() => {
              const next = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
              setStatus(next);
              toast.success(`User ${next === 'ACTIVE' ? 'activated' : 'deactivated'}`);
            }}
          >
            {status === 'ACTIVE' ? 'Deactivate user' : 'Activate user'}
          </Button>
        </div>

        <div className="ticket-divider mt-6 grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-ink/45">Registered</p>
            <p className="text-sm font-medium text-ink">{formatDate(user.registeredAt)}</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Total orders</p>
            <p className="font-mono text-sm font-medium text-ink">{user.ordersCount}</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Total spent</p>
            <p className="font-mono text-sm font-medium text-ink">{formatCurrency(user.totalSpent)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-paper-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">Order history</h2>
        <div className="mt-4">
          <Table
            columns={columns}
            data={userOrders}
            emptyState={<EmptyState icon={ClipboardDocumentListIcon} title="No orders yet" description="This user hasn't placed any orders." />}
          />
        </div>
      </div>
    </div>
  );
}
