/* eslint-disable no-unused-vars */
import type {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useFetch = (
  key: QueryKey,
  queryFn: () => Promise<any>,
  options?: Omit<UseQueryOptions<any>, 'queryFn'>
) => {
  return useQuery({
    queryKey: key,
    queryFn,
    ...options,
  });
};

export const useMutate = (
  createFn: (data: any) => Promise<any>,
  options?: Omit<UseMutationOptions<any, Error, any, unknown>, 'mutationFn'>
): UseMutationResult<any, Error, any, unknown> & {
  res: (data: any) => Promise<void>;
} => {
  const mutation = useMutation({
    mutationFn: createFn,
    ...options,
  });

  const res = async (data: any) => {
    await mutation.mutateAsync(data);
  };

  return {
    ...mutation,
    res,
  };
};
