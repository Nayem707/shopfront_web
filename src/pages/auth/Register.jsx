import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { registerUser, selectAuthStatus } from '@/store/slices/authSlice';
import { useToast } from '@/hooks/useToast';
import { Input, Button } from '@/components/common';
import { ROUTES } from '@/constants/routes';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const status = useSelector(selectAuthStatus);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Use at least 8 characters';
    if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await dispatch(registerUser(form)).unwrap();
      toast.success('Account created');
      navigate(ROUTES.HOME);
    } catch {
      toast.error('Could not create your account. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Create your account</h1>
      <p className="mt-2 text-sm text-ink/55">Join to save your wishlist and track orders.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Input label="Full name" icon={UserIcon} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
        <Input label="Email" type="email" icon={EnvelopeIcon} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
        <Input label="Password" type="password" icon={LockClosedIcon} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} />
        <Input label="Confirm password" type="password" icon={LockClosedIcon} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} error={errors.confirmPassword} />
        <Button type="submit" variant="primary" size="lg" isLoading={status === 'loading'} className="mt-2">
          Create account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-ink/55">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-ink hover:text-accent-dark">
          Sign in
        </Link>
      </p>
    </div>
  );
}
