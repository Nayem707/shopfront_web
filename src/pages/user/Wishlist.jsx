import Wishlist from '@/pages/public/Wishlist';

export default function AccountWishlist() {
  return (
    <div className="rounded-card border border-paper-line bg-white p-6">
      <h2 className="font-display text-xl text-ink mb-5">Your wishlist</h2>
      <Wishlist embedded />
    </div>
  );
}
