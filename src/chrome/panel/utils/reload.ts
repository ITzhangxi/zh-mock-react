import { reloadEvent } from '../../utils/reloadEvent';
reloadEvent(() => setTimeout(() => location.reload(), 500));
