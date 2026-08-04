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
  GetApiV10ProductParams,
  PostApiV10ProductBody,
  PutApiV10ProductIdBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';





/**
 * @summary Get Product by ID
 */
export const getApiV10ProductId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/product/${id}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiV10ProductIdInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/v1.0/product/${id}`
    ] as const;
    }

export const getGetApiV10ProductIdQueryKey = (id?: string,) => {
    return [
    `/api/v1.0/product/${id}`
    ] as const;
    }

    
export const getGetApiV10ProductIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiV10ProductId>>>, TError = void>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10ProductIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10ProductId>>> = ({ signal }) => getApiV10ProductId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  retry: 3, retryDelay: 1000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10ProductIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10ProductId>>>
export type GetApiV10ProductIdInfiniteQueryError = void


export function useGetApiV10ProductIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10ProductId>>>, TError = void>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10ProductId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10ProductId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10ProductIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10ProductId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10ProductId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10ProductId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10ProductIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10ProductId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get Product by ID
 */

export function useGetApiV10ProductIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10ProductId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10ProductIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Product by ID
 */
export const prefetchGetApiV10ProductIdInfiniteQuery = async <TData = Awaited<ReturnType<typeof getApiV10ProductId>>, TError = void>(
 queryClient: QueryClient, id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10ProductIdInfiniteQueryOptions(id,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}



export const getGetApiV10ProductIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV10ProductId>>, TError = void>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10ProductIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10ProductId>>> = ({ signal }) => getApiV10ProductId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  retry: 3, retryDelay: 1000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10ProductIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10ProductId>>>
export type GetApiV10ProductIdQueryError = void


export function useGetApiV10ProductId<TData = Awaited<ReturnType<typeof getApiV10ProductId>>, TError = void>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10ProductId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10ProductId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10ProductId<TData = Awaited<ReturnType<typeof getApiV10ProductId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10ProductId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10ProductId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10ProductId<TData = Awaited<ReturnType<typeof getApiV10ProductId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get Product by ID
 */

export function useGetApiV10ProductId<TData = Awaited<ReturnType<typeof getApiV10ProductId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10ProductIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Product by ID
 */
export const prefetchGetApiV10ProductIdQuery = async <TData = Awaited<ReturnType<typeof getApiV10ProductId>>, TError = void>(
 queryClient: QueryClient, id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10ProductId>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10ProductIdQueryOptions(id,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}



/**
 * @summary Update Product by ID
 */
export const putApiV10ProductId = (
    id: string,
    putApiV10ProductIdBody: PutApiV10ProductIdBody,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/product/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiV10ProductIdBody
    },
      );
    }
  


export const getPutApiV10ProductIdMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiV10ProductId>>, TError,{id: string;data: PutApiV10ProductIdBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiV10ProductId>>, TError,{id: string;data: PutApiV10ProductIdBody}, TContext> => {

const mutationKey = ['putApiV10ProductId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiV10ProductId>>, {id: string;data: PutApiV10ProductIdBody}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiV10ProductId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiV10ProductIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiV10ProductId>>>
    export type PutApiV10ProductIdMutationBody = PutApiV10ProductIdBody
    export type PutApiV10ProductIdMutationError = unknown

    /**
 * @summary Update Product by ID
 */
export const usePutApiV10ProductId = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiV10ProductId>>, TError,{id: string;data: PutApiV10ProductIdBody}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiV10ProductId>>,
        TError,
        {id: string;data: PutApiV10ProductIdBody},
        TContext
      > => {

      const mutationOptions = getPutApiV10ProductIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Delete Product by ID
 */
export const deleteApiV10ProductId = (
    id: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/product/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiV10ProductIdMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10ProductId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10ProductId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiV10ProductId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiV10ProductId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiV10ProductId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiV10ProductIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiV10ProductId>>>
    
    export type DeleteApiV10ProductIdMutationError = unknown

    /**
 * @summary Delete Product by ID
 */
export const useDeleteApiV10ProductId = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10ProductId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiV10ProductId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiV10ProductIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Retrieve a list of products with pagination, filtering and sorting
 * @summary Get all Products
 */
export const getApiV10Product = (
    params?: GetApiV10ProductParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/product`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiV10ProductInfiniteQueryKey = (params?: GetApiV10ProductParams,) => {
    return [
    'infinite', `/api/v1.0/product`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiV10ProductQueryKey = (params?: GetApiV10ProductParams,) => {
    return [
    `/api/v1.0/product`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiV10ProductInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Product>>>, TError = unknown>(params?: GetApiV10ProductParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10ProductInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10Product>>> = ({ signal }) => getApiV10Product(params, signal);

      

      

   return  { queryKey, queryFn,   retry: 3, retryDelay: 1000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10ProductInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10Product>>>
export type GetApiV10ProductInfiniteQueryError = unknown


export function useGetApiV10ProductInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Product>>>, TError = unknown>(
 params: undefined |  GetApiV10ProductParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Product>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Product>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10ProductInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Product>>>, TError = unknown>(
 params?: GetApiV10ProductParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Product>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Product>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10ProductInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Product>>>, TError = unknown>(
 params?: GetApiV10ProductParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all Products
 */

export function useGetApiV10ProductInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Product>>>, TError = unknown>(
 params?: GetApiV10ProductParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10ProductInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get all Products
 */
export const prefetchGetApiV10ProductInfiniteQuery = async <TData = Awaited<ReturnType<typeof getApiV10Product>>, TError = unknown>(
 queryClient: QueryClient, params?: GetApiV10ProductParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10ProductInfiniteQueryOptions(params,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}



export const getGetApiV10ProductQueryOptions = <TData = Awaited<ReturnType<typeof getApiV10Product>>, TError = unknown>(params?: GetApiV10ProductParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10ProductQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10Product>>> = ({ signal }) => getApiV10Product(params, signal);

      

      

   return  { queryKey, queryFn,   retry: 3, retryDelay: 1000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10ProductQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10Product>>>
export type GetApiV10ProductQueryError = unknown


export function useGetApiV10Product<TData = Awaited<ReturnType<typeof getApiV10Product>>, TError = unknown>(
 params: undefined |  GetApiV10ProductParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Product>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Product>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10Product<TData = Awaited<ReturnType<typeof getApiV10Product>>, TError = unknown>(
 params?: GetApiV10ProductParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Product>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Product>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10Product<TData = Awaited<ReturnType<typeof getApiV10Product>>, TError = unknown>(
 params?: GetApiV10ProductParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all Products
 */

export function useGetApiV10Product<TData = Awaited<ReturnType<typeof getApiV10Product>>, TError = unknown>(
 params?: GetApiV10ProductParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10ProductQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get all Products
 */
export const prefetchGetApiV10ProductQuery = async <TData = Awaited<ReturnType<typeof getApiV10Product>>, TError = unknown>(
 queryClient: QueryClient, params?: GetApiV10ProductParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Product>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10ProductQueryOptions(params,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}



/**
 * @summary Create a Product
 */
export const postApiV10Product = (
    postApiV10ProductBody: PostApiV10ProductBody,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/product`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiV10ProductBody, signal
    },
      );
    }
  


export const getPostApiV10ProductMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV10Product>>, TError,{data: PostApiV10ProductBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiV10Product>>, TError,{data: PostApiV10ProductBody}, TContext> => {

const mutationKey = ['postApiV10Product'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV10Product>>, {data: PostApiV10ProductBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiV10Product(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiV10ProductMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV10Product>>>
    export type PostApiV10ProductMutationBody = PostApiV10ProductBody
    export type PostApiV10ProductMutationError = unknown

    /**
 * @summary Create a Product
 */
export const usePostApiV10Product = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV10Product>>, TError,{data: PostApiV10ProductBody}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV10Product>>,
        TError,
        {data: PostApiV10ProductBody},
        TContext
      > => {

      const mutationOptions = getPostApiV10ProductMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    