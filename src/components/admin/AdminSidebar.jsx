import { NavLink } from 'react-router-dom';
import {
  Squares2X2Icon, CubeIcon, TagIcon, ClipboardDocumentListIcon, UsersIcon, Cog6ToothIcon, XMarkIcon,
} from '@heroicons/react/24/outline';
import Logo from '@/components/layout/Logo';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'Dashboard', to: ROUTES.ADMIN, icon: Squares2X2Icon, end: true },
  { label: 'Products', to: ROUTES.ADMIN_PRODUCTS, icon: CubeIcon },
  { label: 'Categories', to: ROUTES.ADMIN_CATEGORIES, icon: TagIcon },
  { label: 'Orders', to: ROUTES.ADMIN_ORDERS, icon: ClipboardDocumentListIcon },
  { label: 'Users', to: ROUTES.ADMIN_USERS, icon: UsersIcon },
  { label: 'Settings', to: ROUTES.ADMIN_SETTINGS, icon: Cog6ToothIcon },
];

export default function AdminSidebar({ mobileOpen, onClose }) {
  const content = (
    <>
      <div className="flex items-center justify-between px-5 py-5">
        <Logo />
        <button onClick={onClose} aria-label="Close menu" className="rounded-full p-1.5 hover:bg-paper-dim lg:hidden">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <span className="px-5 text-[10px] font-semibold uppercase tracking-widest text-ink/35">Admin panel</span>
      <nav className="mt-3 flex flex-col gap-1 px-3">
        {LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.end}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-ink text-paper' : 'text-ink/60 hover:bg-paper-dim'
              )
            }
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <aside className="hidden w-64 flex-shrink-0 border-r border-paper-line bg-white lg:block">
        <div className="sticky top-0">{content}</div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white shadow-pop">{content}</aside>
        </div>
      )}
    </>
  );
}
