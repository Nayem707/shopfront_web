import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/useToast';
import { Input, Button } from '@/components/common';
import { ROUTES } from '@/constants/routes';

const STEPS = {
  EMAIL: 'EMAIL',
  VERIFY: 'VERIFY',
  RESET: 'RESET',
  DONE: 'DONE',
};

export default function ForgotPassword() {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError('Email is required');
    setError('');
    setLoading(true);
    await authService.requestPasswordReset({ email });
    setLoading(false);
    toast.success('Verification code sent');
    setStep(STEPS.VERIFY);
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (code.length < 4) return setError('Enter the 6-digit code sent to your email');
    setError('');
    setStep(STEPS.RESET);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) return setError('Use at least 8 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');
    setError('');
    setStep(STEPS.DONE);
  };

  if (step === STEPS.DONE) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-soft">
          <CheckCircleIcon className="h-7 w-7 text-success" />
        </div>
        <h1 className="mt-5 font-display text-2xl text-ink">Password updated</h1>
        <p className="mt-2 text-sm text-ink/55">You can now sign in with your new password.</p>
        <Button as={Link} to={ROUTES.LOGIN} variant="primary" size="lg" className="mt-6 w-full">
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Reset your password</h1>
      <p className="mt-2 text-sm text-ink/55">
        {step === STEPS.EMAIL && "Enter your email and we'll send you a verification code."}
        {step === STEPS.VERIFY && `Enter the code we sent to ${email}.`}
        {step === STEPS.RESET && 'Choose a new password for your account.'}
      </p>

      {step === STEPS.EMAIL && (
        <form onSubmit={handleEmailSubmit} className="mt-8 flex flex-col gap-4">
          <Input label="Email" type="email" icon={EnvelopeIcon} value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
          <Button type="submit" variant="primary" size="lg" isLoading={loading} className="mt-2">
            Send verification code
          </Button>
        </form>
      )}

      {step === STEPS.VERIFY && (
        <form onSubmit={handleVerifySubmit} className="mt-8 flex flex-col gap-4">
          <Input label="Verification code" placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value)} error={error} />
          <Button type="submit" variant="primary" size="lg" className="mt-2">
            Verify code
          </Button>
          <button type="button" onClick={() => setStep(STEPS.EMAIL)} className="text-sm text-ink/50 hover:text-ink">
            Use a different email
          </button>
        </form>
      )}

      {step === STEPS.RESET && (
        <form onSubmit={handleResetSubmit} className="mt-8 flex flex-col gap-4">
          <Input label="New password" type="password" icon={LockClosedIcon} value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input label="Confirm new password" type="password" icon={LockClosedIcon} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={error} />
          <Button type="submit" variant="primary" size="lg" className="mt-2">
            Update password
          </Button>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-ink/55">
        Remembered your password?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-ink hover:text-accent-dark">
          Sign in
        </Link>
      </p>
    </div>
  );
}
