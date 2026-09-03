import { useState } from 'react';
import { cn } from '@/utils/cn';

export default function ProductGallery({ images = [], alt }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-2.5 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              'h-16 w-14 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors sm:h-20 sm:w-16',
              active === i ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'
            )}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="aspect-[3/4] flex-1 overflow-hidden rounded-card bg-paper-dim">
        <img src={images[active]} alt={alt} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
