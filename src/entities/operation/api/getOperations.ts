import { Operation } from '../model/types';
import { fetcher } from '@/shared/lib/fetcher';

export const getOperations = () =>
  fetcher('/api/data') as Promise<{ data: Operation[] }>;
