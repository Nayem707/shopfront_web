import { useNavigate } from 'react-router-dom';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/store/slices/authSlice';
import { useToast } from '@/hooks/useToast';
import { Dropdown, DropdownItem } from '@/components/common';
import { ROUTES } from '@/constants/routes';

export default function AdminTopbar({ onMenuClick }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-paper-line bg-white/95 px-4 py-3.5 backdrop-blur sm:px-6">
      <button onClick={onMenuClick} aria-label="Open menu" className="rounded-full p-2 hover:bg-paper-dim lg:hidden">
        <Bars3Icon className="h-5.5 w-5.5" />
      </button>

      <div className="relative hidden max-w-xs flex-1 sm:block">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
        <input
          type="search"
          placeholder="Search orders, products, users…"
          aria-label="Admin search"
          className="w-full rounded-full border border-paper-line bg-paper-dim/50 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button aria-label="Notifications" className="relative rounded-full p-2 hover:bg-paper-dim">
          <BellIcon className="h-5.5 w-5.5 text-ink" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 hover:bg-paper-dim" aria-label="Admin menu">
              <img src={user?.avatar || 'https://i.pravatar.cc/150?img=12'} alt="" className="h-7 w-7 rounded-full object-cover" />
              <span className="hidden text-sm font-medium text-ink sm:inline">{user?.name}</span>
            </button>
          }
        >
          <DropdownItem onClick={() => navigate(ROUTES.HOME)}>View storefront</DropdownItem>
          <DropdownItem onClick={() => navigate(ROUTES.ADMIN_SETTINGS)}>Settings</DropdownItem>
          <DropdownItem
            className="text-error"
            onClick={() => {
              dispatch(logout());
              toast.info('Signed out');
              navigate(ROUTES.HOME);
            }}
          >
            Sign out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
