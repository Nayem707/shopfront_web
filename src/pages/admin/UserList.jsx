import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { users as mockUsers } from '@/data/users';
import { Table, SearchBar, Select, Badge, EmptyState, Pagination } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';
import { formatDate, formatCurrency } from '@/utils/format';

const PAGE_SIZE = 8;

export default function AdminUserList() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('ALL');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = role === 'ALL' || u.role === role;
      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const toggleStatus = (id) => {
    setUsers((list) => list.map((u) => (u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : u)));
  };

  const columns = [
    {
      key: 'user', header: 'User',
      render: (u) => (
        <div className="flex items-center gap-3">
          <img src={u.avatar} alt="" className="h-9 w-9 flex-shrink-0 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="line-clamp-1 text-sm font-medium text-ink">{u.name}</p>
            <p className="line-clamp-1 text-xs text-ink/45">{u.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role', header: 'Role', render: (u) => <Badge tone={u.role === 'ADMIN' ? 'accent' : 'neutral'}>{u.role}</Badge> },
    { key: 'registeredAt', header: 'Registered', render: (u) => formatDate(u.registeredAt) },
    { key: 'ordersCount', header: 'Orders' },
    { key: 'totalSpent', header: 'Total spent', render: (u) => <span className="font-mono">{formatCurrency(u.totalSpent)}</span> },
    {
      key: 'status', header: 'Status',
      render: (u) => (
        <button onClick={() => toggleStatus(u.id)}>
          <Badge tone={u.status === 'ACTIVE' ? 'success' : 'neutral'}>{u.status === 'ACTIVE' ? 'Active' : 'Inactive'}</Badge>
        </button>
      ),
    },
    {
      key: 'actions', header: '',
      render: (u) => (
        <Link to={buildRoute(ROUTES.ADMIN_USER_DETAILS, { id: u.id })} aria-label="View user" className="inline-flex rounded-full p-1.5 text-ink/50 hover:bg-paper-dim hover:text-ink">
          <EyeIcon className="h-4 w-4" />
        </Link>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl text-ink">Users</h1>
        <p className="mt-1 text-sm text-ink/50">{filtered.length} registered users</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search name or email…" className="max-w-xs" />
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-40"
          options={[{ value: 'ALL', label: 'All roles' }, { value: 'USER', label: 'User' }, { value: 'ADMIN', label: 'Admin' }]}
        />
      </div>

      <Table columns={columns} data={paginated} emptyState={<EmptyState icon={UsersIcon} title="No users found" description="Try a different search or filter." />} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
