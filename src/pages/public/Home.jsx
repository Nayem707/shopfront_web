import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { fetchProducts, selectProducts, selectProductsStatus } from '@/store/slices/productSlice';
import { fetchCategories, selectCategories } from '@/store/slices/categorySlice';
import ProductGrid from '@/components/product/ProductGrid';
import PromoBanner from '@/components/layout/PromoBanner';
import { Button } from '@/components/common';
import { ROUTES } from '@/constants/routes';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchProducts({ sort: 'newest' }));
    dispatch(fetchCategories());
  }, [dispatch]);

  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const popular = products.filter((p) => p.isPopular).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600&q=80"
          alt="Model wearing a wool overcoat outdoors"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-40">
          <span className="inline-block rounded-full border border-paper/25 px-3 py-1 text-xs font-medium tracking-wide text-paper/80">
            Autumn / Winter 026
          </span>
          <h1 className="mt-5 max-w-xl font-display text-5xl leading-[1.05] text-paper sm:text-6xl">
            Wardrobe staples, cut to last decades.
          </h1>
          <p className="mt-5 max-w-md text-base text-paper/70">
            Small-batch clothing and accessories made from responsibly sourced materials — designed to be worn in, not worn out.
          </p>
          <div className="mt-8 flex gap-3">
            <Button as={Link} to={ROUTES.PRODUCTS} variant="accent" size="lg">
              Shop the collection
            </Button>
            <Button as={Link} to={ROUTES.CATEGORIES} variant="outline" size="lg" className="border-paper/30 text-paper hover:border-paper">
              Explore categories
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Shop by category</span>
            <h2 className="mt-2 font-display text-3xl text-ink">Find your next favorite</h2>
          </div>
          <Link to={ROUTES.CATEGORIES} className="hidden items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink sm:flex">
            View all <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link key={cat.id} to={`${ROUTES.PRODUCTS}?category=${cat.id}`} className="group flex flex-col items-center gap-3 text-center">
              <div className="aspect-square w-full overflow-hidden rounded-full bg-paper-dim">
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{cat.name}</p>
                <p className="text-xs text-ink/45">{cat.productCount} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="ticket-divider mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Featured</span>
            <h2 className="mt-2 font-display text-3xl text-ink">Editor's picks</h2>
          </div>
          <Link to={`${ROUTES.PRODUCTS}?filter=featured`} className="hidden items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink sm:flex">
            View all <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={featured} isLoading={status === 'loading'} skeletonCount={4} />
        </div>
      </section>

      <PromoBanner />

      {/* Popular */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Popular right now</span>
            <h2 className="mt-2 font-display text-3xl text-ink">Customer favorites</h2>
          </div>
          <Link to={`${ROUTES.PRODUCTS}?filter=popular`} className="hidden items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink sm:flex">
            View all <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={popular} isLoading={status === 'loading'} skeletonCount={8} />
        </div>
      </section>

      {/* New arrivals */}
      <section className="ticket-divider mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Just landed</span>
            <h2 className="mt-2 font-display text-3xl text-ink">New arrivals</h2>
          </div>
          <Link to={`${ROUTES.PRODUCTS}?filter=new`} className="hidden items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink sm:flex">
            View all <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={newArrivals} isLoading={status === 'loading'} skeletonCount={4} />
        </div>
      </section>
    </div>
  );
}
