import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AccountLayout from '@/layouts/AccountLayout';
import AdminLayout from '@/layouts/AdminLayout';

import ProtectedRoute from '@/routes/ProtectedRoute';
import AdminRoute from '@/routes/AdminRoute';
import GuestRoute from '@/routes/GuestRoute';

import Home from '@/pages/public/Home';
import Products from '@/pages/public/Products';
import ProductDetails from '@/pages/public/ProductDetails';
import Categories from '@/pages/public/Categories';
import Cart from '@/pages/public/Cart';
import Wishlist from '@/pages/public/Wishlist';
import Checkout from '@/pages/public/Checkout';

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';

import AccountOverview from '@/pages/user/AccountOverview';
import Profile from '@/pages/user/Profile';
import Orders from '@/pages/user/Orders';
import OrderDetails from '@/pages/user/OrderDetails';
import Addresses from '@/pages/user/Addresses';
import Settings from '@/pages/user/Settings';
import AccountWishlist from '@/pages/user/Wishlist';

import AdminDashboard from '@/pages/admin/Dashboard';
import AdminProductList from '@/pages/admin/ProductList';
import AdminProductCreate from '@/pages/admin/ProductCreate';
import AdminProductEdit from '@/pages/admin/ProductEdit';
import AdminProductDetails from '@/pages/admin/ProductDetails';
import AdminCategoryList from '@/pages/admin/CategoryList';
import AdminOrderList from '@/pages/admin/OrderList';
import AdminOrderDetails from '@/pages/admin/OrderDetails';
import AdminUserList from '@/pages/admin/UserList';
import AdminUserDetails from '@/pages/admin/UserDetails';
import AdminSettings from '@/pages/admin/Settings';

import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public storefront */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* Auth (guests only) */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Route>

        {/* User account (protected) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AccountLayout />}>
            <Route path="/account" element={<AccountOverview />} />
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/orders" element={<Orders />} />
            <Route path="/account/orders/:id" element={<OrderDetails />} />
            <Route path="/account/wishlist" element={<AccountWishlist />} />
            <Route path="/account/addresses" element={<Addresses />} />
            <Route path="/account/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Admin panel (protected + role guarded) */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/products/create" element={<AdminProductCreate />} />
            <Route path="/admin/products/:id" element={<AdminProductDetails />} />
            <Route path="/admin/products/:id/edit" element={<AdminProductEdit />} />
            <Route path="/admin/categories" element={<AdminCategoryList />} />
            <Route path="/admin/orders" element={<AdminOrderList />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
            <Route path="/admin/users" element={<AdminUserList />} />
            <Route path="/admin/users/:id" element={<AdminUserDetails />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
