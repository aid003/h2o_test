export const fetcher = async <T = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
};