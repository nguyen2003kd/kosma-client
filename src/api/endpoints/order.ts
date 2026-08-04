/* eslint-disable */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  GetApiV10OrderParams,
  PostApiV10OrderBody,
  PutApiV10OrderIdBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';





/**
 * @summary Get Order by ID
 */
export const getApiV10OrderId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/order/${id}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiV10OrderIdInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/v1.0/order/${id}`
    ] as const;
    }

export const getGetApiV10OrderIdQueryKey = (id?: string,) => {
    return [
    `/api/v1.0/order/${id}`
    ] as const;
    }

    
export const getGetApiV10OrderIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiV10OrderId>>>, TError = void>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10OrderIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10OrderId>>> = ({ signal }) => getApiV10OrderId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  retry: 3, retryDelay: 1000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10OrderIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10OrderId>>>
export type GetApiV10OrderIdInfiniteQueryError = void


export function useGetApiV10OrderIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10OrderId>>>, TError = void>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10OrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10OrderId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10OrderIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10OrderId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10OrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10OrderId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10OrderIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10OrderId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get Order by ID
 */

export function useGetApiV10OrderIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10OrderId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10OrderIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Order by ID
 */
export const prefetchGetApiV10OrderIdInfiniteQuery = async <TData = Awaited<ReturnType<typeof getApiV10OrderId>>, TError = void>(
 queryClient: QueryClient, id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10OrderIdInfiniteQueryOptions(id,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}



export const getGetApiV10OrderIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV10OrderId>>, TError = void>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10OrderIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10OrderId>>> = ({ signal }) => getApiV10OrderId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  retry: 3, retryDelay: 1000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10OrderIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10OrderId>>>
export type GetApiV10OrderIdQueryError = void


export function useGetApiV10OrderId<TData = Awaited<ReturnType<typeof getApiV10OrderId>>, TError = void>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10OrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10OrderId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10OrderId<TData = Awaited<ReturnType<typeof getApiV10OrderId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10OrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10OrderId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10OrderId<TData = Awaited<ReturnType<typeof getApiV10OrderId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get Order by ID
 */

export function useGetApiV10OrderId<TData = Awaited<ReturnType<typeof getApiV10OrderId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10OrderIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Order by ID
 */
export const prefetchGetApiV10OrderIdQuery = async <TData = Awaited<ReturnType<typeof getApiV10OrderId>>, TError = void>(
 queryClient: QueryClient, id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10OrderId>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10OrderIdQueryOptions(id,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}



/**
 * @summary Update Order by ID
 */
export const putApiV10OrderId = (
    id: string,
    putApiV10OrderIdBody: PutApiV10OrderIdBody,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/order/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiV10OrderIdBody
    },
      );
    }
  


export const getPutApiV10OrderIdMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiV10OrderId>>, TError,{id: string;data: PutApiV10OrderIdBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiV10OrderId>>, TError,{id: string;data: PutApiV10OrderIdBody}, TContext> => {

const mutationKey = ['putApiV10OrderId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiV10OrderId>>, {id: string;data: PutApiV10OrderIdBody}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiV10OrderId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiV10OrderIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiV10OrderId>>>
    export type PutApiV10OrderIdMutationBody = PutApiV10OrderIdBody
    export type PutApiV10OrderIdMutationError = unknown

    /**
 * @summary Update Order by ID
 */
export const usePutApiV10OrderId = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiV10OrderId>>, TError,{id: string;data: PutApiV10OrderIdBody}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiV10OrderId>>,
        TError,
        {id: string;data: PutApiV10OrderIdBody},
        TContext
      > => {

      const mutationOptions = getPutApiV10OrderIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Delete Order by ID
 */
export const deleteApiV10OrderId = (
    id: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/order/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiV10OrderIdMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10OrderId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10OrderId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiV10OrderId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiV10OrderId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiV10OrderId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiV10OrderIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiV10OrderId>>>
    
    export type DeleteApiV10OrderIdMutationError = unknown

    /**
 * @summary Delete Order by ID
 */
export const useDeleteApiV10OrderId = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10OrderId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiV10OrderId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiV10OrderIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Retrieve a list of orders with pagination, filtering and sorting
 * @summary Get all Orders
 */
export const getApiV10Order = (
    params?: GetApiV10OrderParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/order`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiV10OrderInfiniteQueryKey = (params?: GetApiV10OrderParams,) => {
    return [
    'infinite', `/api/v1.0/order`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiV10OrderQueryKey = (params?: GetApiV10OrderParams,) => {
    return [
    `/api/v1.0/order`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiV10OrderInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Order>>>, TError = unknown>(params?: GetApiV10OrderParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10OrderInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10Order>>> = ({ signal }) => getApiV10Order(params, signal);

      

      

   return  { queryKey, queryFn,   retry: 3, retryDelay: 1000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10OrderInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10Order>>>
export type GetApiV10OrderInfiniteQueryError = unknown


export function useGetApiV10OrderInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Order>>>, TError = unknown>(
 params: undefined |  GetApiV10OrderParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Order>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Order>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10OrderInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Order>>>, TError = unknown>(
 params?: GetApiV10OrderParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Order>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Order>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10OrderInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Order>>>, TError = unknown>(
 params?: GetApiV10OrderParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all Orders
 */

export function useGetApiV10OrderInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Order>>>, TError = unknown>(
 params?: GetApiV10OrderParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10OrderInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get all Orders
 */
export const prefetchGetApiV10OrderInfiniteQuery = async <TData = Awaited<ReturnType<typeof getApiV10Order>>, TError = unknown>(
 queryClient: QueryClient, params?: GetApiV10OrderParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10OrderInfiniteQueryOptions(params,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}



export const getGetApiV10OrderQueryOptions = <TData = Awaited<ReturnType<typeof getApiV10Order>>, TError = unknown>(params?: GetApiV10OrderParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10OrderQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10Order>>> = ({ signal }) => getApiV10Order(params, signal);

      

      

   return  { queryKey, queryFn,   retry: 3, retryDelay: 1000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10OrderQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10Order>>>
export type GetApiV10OrderQueryError = unknown


export function useGetApiV10Order<TData = Awaited<ReturnType<typeof getApiV10Order>>, TError = unknown>(
 params: undefined |  GetApiV10OrderParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Order>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Order>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10Order<TData = Awaited<ReturnType<typeof getApiV10Order>>, TError = unknown>(
 params?: GetApiV10OrderParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Order>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Order>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10Order<TData = Awaited<ReturnType<typeof getApiV10Order>>, TError = unknown>(
 params?: GetApiV10OrderParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all Orders
 */

export function useGetApiV10Order<TData = Awaited<ReturnType<typeof getApiV10Order>>, TError = unknown>(
 params?: GetApiV10OrderParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10OrderQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get all Orders
 */
export const prefetchGetApiV10OrderQuery = async <TData = Awaited<ReturnType<typeof getApiV10Order>>, TError = unknown>(
 queryClient: QueryClient, params?: GetApiV10OrderParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Order>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10OrderQueryOptions(params,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}



/**
 * Create a new order with items
 * @summary Create an Order
 */
export const postApiV10Order = (
    postApiV10OrderBody: PostApiV10OrderBody,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/order`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiV10OrderBody, signal
    },
      );
    }
  


export const getPostApiV10OrderMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV10Order>>, TError,{data: PostApiV10OrderBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiV10Order>>, TError,{data: PostApiV10OrderBody}, TContext> => {

const mutationKey = ['postApiV10Order'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV10Order>>, {data: PostApiV10OrderBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiV10Order(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiV10OrderMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV10Order>>>
    export type PostApiV10OrderMutationBody = PostApiV10OrderBody
    export type PostApiV10OrderMutationError = unknown

    /**
 * @summary Create an Order
 */
export const usePostApiV10Order = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV10Order>>, TError,{data: PostApiV10OrderBody}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV10Order>>,
        TError,
        {data: PostApiV10OrderBody},
        TContext
      > => {

      const mutationOptions = getPostApiV10OrderMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    