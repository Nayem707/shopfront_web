import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { dismissToast, selectToasts } from '@/store/slices/uiSlice';
import { cn } from '@/utils/cn';

const ICONS = {
  success: <CheckCircleIcon className="h-5 w-5 text-success" />,
  error: <ExclamationCircleIcon className="h-5 w-5 text-error" />,
  info: <InformationCircleIcon className="h-5 w-5 text-info" />,
};

function ToastItem({ toast }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const t = setTimeout(() => dispatch(dismissToast(toast.id)), 3500);
    return () => clearTimeout(t);
  }, [toast.id, dispatch]);

  return (
    <div
      role="status"
      className="flex items-start gap-2.5 rounded-lg border border-paper-line bg-white px-4 py-3 shadow-pop min-w-[260px] max-w-sm animate-[fadeIn_0.15s_ease]"
    >
      {ICONS[toast.type]}
      <p className="flex-1 text-sm text-ink">{toast.message}</p>
      <button onClick={() => dispatch(dismissToast(toast.id))} aria-label="Dismiss" className="text-ink/40 hover:text-ink">
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useSelector(selectToasts);
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}
