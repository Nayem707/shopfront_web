import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function Logo({ className = '' }) {
  return (
    <Link to={ROUTES.HOME} className={`font-display text-2xl font-semibold tracking-tight text-ink ${className}`}>
      Fernway<span className="text-accent">.</span>
    </Link>
  );
}
