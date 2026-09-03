import { NavLink } from 'react-router-dom';
import {
  Squares2X2Icon, UserIcon, ClipboardDocumentListIcon, HeartIcon, MapPinIcon, Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Overview', to: ROUTES.ACCOUNT, icon: Squares2X2Icon, end: true },
  { label: 'Profile', to: ROUTES.ACCOUNT_PROFILE, icon: UserIcon },
  { label: 'Orders', to: ROUTES.ACCOUNT_ORDERS, icon: ClipboardDocumentListIcon },
  { label: 'Wishlist', to: ROUTES.ACCOUNT_WISHLIST, icon: HeartIcon },
  { label: 'Addresses', to: ROUTES.ACCOUNT_ADDRESSES, icon: MapPinIcon },
  { label: 'Account settings', to: ROUTES.ACCOUNT_SETTINGS, icon: Cog6ToothIcon },
];

export default function AccountSidebar() {
  return (
    <nav className="flex gap-1 overflow-x-auto pb-2 lg:w-56 lg:flex-shrink-0 lg:flex-col lg:overflow-visible lg:pb-0">
      {LINKS.map((link) => (
        <NavLink
          key={link.label}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors',
              isActive ? 'bg-ink text-paper' : 'text-ink/60 hover:bg-paper-dim'
            )
          }
        >
          <link.icon className="h-4.5 w-4.5" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
