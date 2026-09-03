import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink/50">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRightIcon className="h-3 w-3" />}
          {item.to && i !== items.length - 1 ? (
            <Link to={item.to} className="hover:text-ink transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
