import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bars3Icon, XMarkIcon, HeartIcon, UserCircleIcon,
} from '@heroicons/react/24/outline';
import Logo from './Logo';
import MiniCart from './MiniCart';
import SearchBar from '@/components/common/SearchBar';
import { Dropdown, DropdownItem } from '@/components/common';
import { selectCartCount } from '@/store/slices/cartSlice';
import { selectWishlistCount } from '@/store/slices/wishlistSlice';
import { selectAuthUser, selectIsAuthenticated, logout } from '@/store/slices/authSlice';
import { useToast } from '@/hooks/useToast';
import { ROUTES } from '@/constants/routes';

const NAV_LINKS = [
  { label: 'Shop', to: ROUTES.PRODUCTS },
  { label: 'Categories', to: ROUTES.CATEGORIES },
  { label: 'New arrivals', to: `${ROUTES.PRODUCTS}?filter=new` },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSearch = (value) => {
    navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(value)}`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-paper-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <button
          className="rounded-full p-2 hover:bg-paper-dim lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Bars3Icon className="h-5.5 w-5.5" />
        </button>

        <Logo />

        <nav className="hidden items-center gap-6 lg:flex ml-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-ink' : 'text-ink/55 hover:text-ink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden flex-1 md:block max-w-md ml-auto mr-2">
          <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} />
        </div>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Link to={ROUTES.WISHLIST} aria-label="Wishlist" className="relative hidden rounded-full p-2 hover:bg-paper-dim sm:block">
            <HeartIcon className="h-5.5 w-5.5 text-ink" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-paper">
                {wishlistCount}
              </span>
            )}
          </Link>

          <MiniCart count={cartCount} />

          {isAuthenticated ? (
            <Dropdown
              trigger={
                <button className="ml-1 flex items-center gap-2 rounded-full p-1 hover:bg-paper-dim" aria-label="Account menu">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                  ) : (
                    <UserCircleIcon className="h-7 w-7 text-ink" />
                  )}
                </button>
              }
            >
              <div className="px-3.5 py-2 border-b border-paper-line mb-1">
                <p className="text-sm font-medium text-ink line-clamp-1">{user?.name}</p>
                <p className="text-xs text-ink/45 line-clamp-1">{user?.email}</p>
              </div>
              <DropdownItem onClick={() => navigate(ROUTES.ACCOUNT)}>Dashboard</DropdownItem>
              <DropdownItem onClick={() => navigate(ROUTES.ACCOUNT_ORDERS)}>My orders</DropdownItem>
              {user?.role === 'ADMIN' && (
                <DropdownItem onClick={() => navigate(ROUTES.ADMIN)}>Admin panel</DropdownItem>
              )}
              <DropdownItem
                onClick={() => {
                  dispatch(logout());
                  toast.info('Signed out');
                  navigate(ROUTES.HOME);
                }}
                className="text-error"
              >
                Sign out
              </DropdownItem>
            </Dropdown>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="ml-1 rounded-full p-2 hover:bg-paper-dim"
              aria-label="Sign in"
            >
              <UserCircleIcon className="h-6 w-6 text-ink" />
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-paper-line px-4 py-2.5 md:hidden">
        <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-paper p-5 shadow-pop">
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-paper-dim">
                <XMarkIcon className="h-5.5 w-5.5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-paper-dim"
                >
                  {link.label}
                </Link>
              ))}
              <Link to={ROUTES.WISHLIST} onClick={() => setMobileOpen(false)} className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-paper-dim">
                Wishlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
