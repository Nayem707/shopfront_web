import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { fetchProducts, selectProducts, selectProductsStatus, setFilters, selectProductFilters } from '@/store/slices/productSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import { Breadcrumb, SearchBar, Select, Pagination, Button } from '@/components/common';
import { useDebounce } from '@/hooks/useDebounce';
import { ROUTES } from '@/constants/routes';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'rating', label: 'Top rated' },
];

const PAGE_SIZE = 12;

export default function Products() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const filters = useSelector(selectProductFilters);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) dispatch(setFilters({ categoryId: categoryParam }));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, search: debouncedSearch }));
    setPage(1);
  }, [dispatch, filters, debouncedSearch]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, page]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  const activeFilterCount =
    (filters.categoryId ? 1 : 0) + (filters.minPrice != null || filters.maxPrice != null ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'All products' }]} />
      <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl text-ink">All products</h1>
          <p className="mt-1 text-sm text-ink/50">{products.length} results</p>
        </div>
        <div className="flex gap-3">
          <SearchBar value={search} onChange={setSearch} className="w-56" />
          <Select
            options={SORT_OPTIONS}
            value={filters.sort}
            onChange={(e) => dispatch(setFilters({ sort: e.target.value }))}
            className="w-44"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-10">
        <aside className="hidden w-56 flex-shrink-0 lg:block">
          <ProductFilters filters={filters} onChange={(f) => dispatch(setFilters(f))} />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <Button variant="outline" size="sm" icon={FunnelIcon} onClick={() => setMobileFiltersOpen(true)}>
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          </div>

          <ProductGrid products={paginated} isLoading={status === 'loading'} />

          <div className="mt-12">
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-paper p-5 shadow-pop">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg text-ink">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters" className="rounded-full p-1.5 hover:bg-paper-dim">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <ProductFilters filters={filters} onChange={(f) => dispatch(setFilters(f))} />
            <Button variant="primary" className="mt-8 w-full" onClick={() => setMobileFiltersOpen(false)}>
              Show {products.length} results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
