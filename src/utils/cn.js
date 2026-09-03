import clsx from 'clsx';

// Thin wrapper so the whole app imports classnames merging from one place (SRP / DIP).
export const cn = (...inputs) => clsx(...inputs);
