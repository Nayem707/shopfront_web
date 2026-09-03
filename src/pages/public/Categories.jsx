import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories, selectCategoriesStatus } from '@/store/slices/categorySlice';
import { Breadcrumb, Skeleton } from '@/components/common';
import { ROUTES } from '@/constants/routes';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoriesStatus);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'Categories' }]} />
      <h1 className="mt-2 font-display text-3xl text-ink">Shop by category</h1>
      <p className="mt-1 max-w-md text-sm text-ink/55">
        Every category is a small, considered range — built to be worn together and worn for years.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {status === 'loading'
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-card" />)
          : categories.map((cat) => (
              <Link
                key={cat.id}
                to={`${ROUTES.PRODUCTS}?category=${cat.id}`}
                className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-card bg-paper-dim p-6"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="relative">
                  <h3 className="font-display text-2xl text-paper">{cat.name}</h3>
                  <p className="mt-1 text-sm text-paper/75">{cat.productCount} products</p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
