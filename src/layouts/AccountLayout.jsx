import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccountSidebar from '@/components/dashboard/AccountSidebar';
import ToastContainer from '@/components/common/Toast';
import Breadcrumb from '@/components/common/Breadcrumb';
import { ROUTES } from '@/constants/routes';

export default function AccountLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'My account' }]} />
          <h1 className="mt-2 font-display text-3xl text-ink">My account</h1>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <AccountSidebar />
            <div className="min-w-0 flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
