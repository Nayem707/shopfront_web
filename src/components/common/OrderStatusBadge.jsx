import Badge from './Badge';
import { ORDER_STATUS } from '@/constants';

const TONE_MAP = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.CONFIRMED]: 'info',
  [ORDER_STATUS.PROCESSING]: 'info',
  [ORDER_STATUS.SHIPPED]: 'accent',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'error',
};

export default function OrderStatusBadge({ status }) {
  return (
    <Badge tone={TONE_MAP[status] || 'neutral'} dot>
      {status?.charAt(0) + status?.slice(1).toLowerCase()}
    </Badge>
  );
}
