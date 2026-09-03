import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

export default function Dropdown({ trigger, children, align = 'right', className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute z-40 mt-2 min-w-[180px] rounded-lg border border-paper-line bg-white py-1.5 shadow-pop',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm text-ink hover:bg-paper-dim',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
