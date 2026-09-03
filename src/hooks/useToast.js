import { useDispatch } from 'react-redux';
import { showToast } from '@/store/slices/uiSlice';

export function useToast() {
  const dispatch = useDispatch();
  return {
    success: (message) => dispatch(showToast(message, 'success')),
    error: (message) => dispatch(showToast(message, 'error')),
    info: (message) => dispatch(showToast(message, 'info')),
  };
}
