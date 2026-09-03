import { Link } from 'react-router-dom';
import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { Button, Input } from '@/components/common';
import { useToast } from '@/hooks/useToast';
import { ROUTES } from '@/constants/routes';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', to: ROUTES.PRODUCTS },
      { label: 'Categories', to: ROUTES.CATEGORIES },
      { label: 'New arrivals', to: `${ROUTES.PRODUCTS}?filter=new` },
      { label: 'Wishlist', to: ROUTES.WISHLIST },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'My orders', to: ROUTES.ACCOUNT_ORDERS },
      { label: 'Track order', to: ROUTES.ACCOUNT_ORDERS },
      { label: 'Addresses', to: ROUTES.ACCOUNT_ADDRESSES },
      { label: 'Settings', to: ROUTES.ACCOUNT_SETTINGS },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: ROUTES.HOME },
      { label: 'Sustainability', to: ROUTES.HOME },
      { label: 'Careers', to: ROUTES.HOME },
      { label: 'Contact', to: ROUTES.HOME },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const toast = useToast();

  return (
    <footer className="border-t border-paper-line bg-paper-dim/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-3 max-w-[220px] text-sm text-ink/55">
              Considered essentials, made to be repaired rather than replaced.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-ink/55 hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ticket-divider mt-12 flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <div>
            <h4 className="font-display text-lg text-ink">Stay in the loop</h4>
            <p className="text-sm text-ink/55">New arrivals and considered restocks, twice a month.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Subscribed — welcome aboard');
              setEmail('');
            }}
            className="flex w-full max-w-sm gap-2 sm:w-auto"
          >
            <Input
              type="email"
              required
              icon={EnvelopeIcon}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              containerClassName="flex-1"
            />
            <Button type="submit" variant="primary">Subscribe</Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 text-xs text-ink/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Fernway. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to={ROUTES.HOME} className="hover:text-ink">Privacy</Link>
            <Link to={ROUTES.HOME} className="hover:text-ink">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
