import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-mono text-sm tracking-widest text-accent-dark">ERROR 404</span>
      <h1 className="mt-3 font-display text-4xl text-ink">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-ink/55">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Button as={Link} to={ROUTES.HOME} variant="primary" size="lg" className="mt-8">
        Back to home
      </Button>
    </div>
  );
}
