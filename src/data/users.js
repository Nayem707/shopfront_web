import { ROLES, USER_STATUS } from '@/constants';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const firstNames = ['Amara', 'Diego', 'Priya', 'Noah', 'Yuki', 'Layla', 'Marcus', 'Elena', 'Tomas', 'Sofia', 'Kwame', 'Ingrid'];
const lastNames = ['Voss', 'Marín', 'Shah', 'Bergström', 'Tanaka', 'Haddad', 'Reyes', 'Novak', 'Iwu', 'Berg'];

export const users = Array.from({ length: 14 }).map((_, i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[(i + 3) % lastNames.length];
  return {
    id: `usr-${String(i + 1).padStart(3, '0')}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    role: i === 0 ? ROLES.ADMIN : ROLES.USER,
    status: i % 6 === 0 ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE,
    registeredAt: new Date(Date.now() - rand(5, 400) * 86400000).toISOString(),
    ordersCount: rand(0, 24),
    totalSpent: rand(0, 4200),
  };
});

export const getUserById = (id) => users.find((u) => u.id === id);
