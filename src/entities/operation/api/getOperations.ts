import { fetcher } from '@/shared/lib/fetcher';
import { Operation } from '../model/types';

export interface GetOperationsParams {
  division?: 'B2B' | 'B2C';
  range?: 'week' | 'month' | 'year';
}

export const getOperations = async <T extends GetOperationsParams>([
  url,
  params,
]: [string, T?]) => {
  const qp = new URLSearchParams({
    ...(params?.division && { division: params.division }),
    ...(params?.range && { range: params.range }),
  }).toString();

  return fetcher<{ data: Operation[] }>(`${url}?${qp}`);
};