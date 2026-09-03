import { Outlet } from 'react-router-dom';
import Logo from '@/components/layout/Logo';
import ToastContainer from '@/components/common/Toast';

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-8 sm:px-12 sm:py-10">
        <Logo />
        <div className="mx-auto w-full max-w-sm py-10">
          <Outlet />
        </div>
        <p className="text-center text-xs text-ink/35 lg:text-left">© {new Date().getFullYear()} Fernway. All rights reserved.</p>
      </div>
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80"
          alt=""
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="font-display text-3xl leading-snug text-paper">
            "Considered essentials, made to be repaired — not replaced."
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
