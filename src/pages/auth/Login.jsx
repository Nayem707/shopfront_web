import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { loginUser, selectAuthStatus } from '@/store/slices/authSlice';
import { useToast } from '@/hooks/useToast';
import { Input, Button } from '@/components/common';
import { ROUTES } from '@/constants/routes';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const status = useSelector(selectAuthStatus);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await dispatch(loginUser(form)).unwrap();
      toast.success('Welcome back');
      navigate(location.state?.from?.pathname || ROUTES.HOME, { replace: true });
    } catch {
      toast.error('Could not sign in. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Welcome back</h1>
      <p className="mt-2 text-sm text-ink/55">Sign in to continue to your account.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          icon={EnvelopeIcon}
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          hint="Tip: use an email containing 'admin' to preview the admin panel"
        />
        <Input
          label="Password"
          type="password"
          icon={LockClosedIcon}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />
        <div className="flex justify-end">
          <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm font-medium text-ink/55 hover:text-ink">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="primary" size="lg" isLoading={status === 'loading'} className="mt-2">
          Sign in
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-ink/55">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="font-medium text-ink hover:text-accent-dark">
          Create one
        </Link>
      </p>
    </div>
  );
}
