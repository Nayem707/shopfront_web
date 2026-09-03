import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          to="/products?filter=new"
          className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-card bg-ink p-7"
        >
          <img
            src="https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=1000&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="relative">
            <span className="text-xs font-medium uppercase tracking-widest text-paper/70">Fall edit</span>
            <h3 className="mt-2 font-display text-2xl text-paper">Outerwear built for the season ahead</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-paper">
              Shop the edit <ArrowRightIcon className="h-4 w-4" />
            </span>
          </div>
        </Link>
        <Link
          to="/categories"
          className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-card bg-accent-soft p-7"
        >
          <img
            src="https://images.unsplash.com/photo-1560243563-062bfc001d68?w=1000&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="relative">
            <span className="text-xs font-medium uppercase tracking-widest text-ink/60">Gift with intention</span>
            <h3 className="mt-2 font-display text-2xl text-ink">Accessories, from $45</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              Browse accessories <ArrowRightIcon className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
