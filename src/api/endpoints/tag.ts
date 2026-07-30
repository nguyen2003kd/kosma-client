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
  DeleteApiV10TagsId200,
  GetApiV10TagsId200,
  GetApiV10TagsParams,
  PostApiV10Tags200,
  PutApiV10TagsId200,
  ResponseGetAllData,
  TagMutate
} from '../models';

import { mainInstance } from '../mutator/custom-instance';





/**
 * Retrieve a single tag record by its ID
 * @summary Get tag by ID
 */
export const getApiV10TagsId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiV10TagsId200>(
      {url: `/api/v1.0/tags/${id}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiV10TagsIdInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/v1.0/tags/${id}`
    ] as const;
    }

export const getGetApiV10TagsIdQueryKey = (id?: string,) => {
    return [
    `/api/v1.0/tags/${id}`
    ] as const;
    }

    
export const getGetApiV10TagsIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiV10TagsId>>>, TError = void>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10TagsIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10TagsId>>> = ({ signal }) => getApiV10TagsId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  retry: 3, retryDelay: 1000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10TagsIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10TagsId>>>
export type GetApiV10TagsIdInfiniteQueryError = void


export function useGetApiV10TagsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10TagsId>>>, TError = void>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10TagsId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10TagsId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10TagsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10TagsId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10TagsId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10TagsId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10TagsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10TagsId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get tag by ID
 */

export function useGetApiV10TagsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10TagsId>>>, TError = void>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10TagsIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get tag by ID
 */
export const prefetchGetApiV10TagsIdInfiniteQuery = async <TData = Awaited<ReturnType<typeof getApiV10TagsId>>, TError = void>(
 queryClient: QueryClient, id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10TagsIdInfiniteQueryOptions(id,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}



export const getGetApiV10TagsIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV10TagsId>>, TError = void>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10TagsIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10TagsId>>> = ({ signal }) => getApiV10TagsId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  retry: 3, retryDelay: 1000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10TagsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10TagsId>>>
export type GetApiV10TagsIdQueryError = void


export function useGetApiV10TagsId<TData = Awaited<ReturnType<typeof getApiV10TagsId>>, TError = void>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10TagsId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10TagsId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10TagsId<TData = Awaited<ReturnType<typeof getApiV10TagsId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10TagsId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10TagsId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10TagsId<TData = Awaited<ReturnType<typeof getApiV10TagsId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get tag by ID
 */

export function useGetApiV10TagsId<TData = Awaited<ReturnType<typeof getApiV10TagsId>>, TError = void>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10TagsIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get tag by ID
 */
export const prefetchGetApiV10TagsIdQuery = async <TData = Awaited<ReturnType<typeof getApiV10TagsId>>, TError = void>(
 queryClient: QueryClient, id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10TagsId>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10TagsIdQueryOptions(id,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}



/**
 * Update a single tag record by its ID
 * @summary Update tag by ID
 */
export const putApiV10TagsId = (
    id: string,
    tagMutate: TagMutate,
 ) => {
      
      
      return mainInstance<PutApiV10TagsId200>(
      {url: `/api/v1.0/tags/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: tagMutate
    },
      );
    }
  


export const getPutApiV10TagsIdMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiV10TagsId>>, TError,{id: string;data: TagMutate}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiV10TagsId>>, TError,{id: string;data: TagMutate}, TContext> => {

const mutationKey = ['putApiV10TagsId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiV10TagsId>>, {id: string;data: TagMutate}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiV10TagsId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiV10TagsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiV10TagsId>>>
    export type PutApiV10TagsIdMutationBody = TagMutate
    export type PutApiV10TagsIdMutationError = void

    /**
 * @summary Update tag by ID
 */
export const usePutApiV10TagsId = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiV10TagsId>>, TError,{id: string;data: TagMutate}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiV10TagsId>>,
        TError,
        {id: string;data: TagMutate},
        TContext
      > => {

      const mutationOptions = getPutApiV10TagsIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Delete a single tag record by its ID. Associated post_tag relationships will also be removed.
 * @summary Delete tag by ID
 */
export const deleteApiV10TagsId = (
    id: string,
 ) => {
      
      
      return mainInstance<DeleteApiV10TagsId200>(
      {url: `/api/v1.0/tags/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiV10TagsIdMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10TagsId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10TagsId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiV10TagsId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiV10TagsId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiV10TagsId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiV10TagsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiV10TagsId>>>
    
    export type DeleteApiV10TagsIdMutationError = void

    /**
 * @summary Delete tag by ID
 */
export const useDeleteApiV10TagsId = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10TagsId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiV10TagsId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiV10TagsIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Retrieve a list of tags with pagination, filtering and sorting
 * @summary Get all tags
 */
export const getApiV10Tags = (
    params?: GetApiV10TagsParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<ResponseGetAllData>(
      {url: `/api/v1.0/tags`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiV10TagsInfiniteQueryKey = (params?: GetApiV10TagsParams,) => {
    return [
    'infinite', `/api/v1.0/tags`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiV10TagsQueryKey = (params?: GetApiV10TagsParams,) => {
    return [
    `/api/v1.0/tags`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiV10TagsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Tags>>>, TError = unknown>(params?: GetApiV10TagsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10TagsInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10Tags>>> = ({ signal }) => getApiV10Tags(params, signal);

      

      

   return  { queryKey, queryFn,   retry: 3, retryDelay: 1000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10TagsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10Tags>>>
export type GetApiV10TagsInfiniteQueryError = unknown


export function useGetApiV10TagsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Tags>>>, TError = unknown>(
 params: undefined |  GetApiV10TagsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Tags>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Tags>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10TagsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Tags>>>, TError = unknown>(
 params?: GetApiV10TagsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Tags>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Tags>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10TagsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Tags>>>, TError = unknown>(
 params?: GetApiV10TagsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all tags
 */

export function useGetApiV10TagsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10Tags>>>, TError = unknown>(
 params?: GetApiV10TagsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10TagsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get all tags
 */
export const prefetchGetApiV10TagsInfiniteQuery = async <TData = Awaited<ReturnType<typeof getApiV10Tags>>, TError = unknown>(
 queryClient: QueryClient, params?: GetApiV10TagsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10TagsInfiniteQueryOptions(params,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}



export const getGetApiV10TagsQueryOptions = <TData = Awaited<ReturnType<typeof getApiV10Tags>>, TError = unknown>(params?: GetApiV10TagsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10TagsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10Tags>>> = ({ signal }) => getApiV10Tags(params, signal);

      

      

   return  { queryKey, queryFn,   retry: 3, retryDelay: 1000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10TagsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10Tags>>>
export type GetApiV10TagsQueryError = unknown


export function useGetApiV10Tags<TData = Awaited<ReturnType<typeof getApiV10Tags>>, TError = unknown>(
 params: undefined |  GetApiV10TagsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Tags>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Tags>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10Tags<TData = Awaited<ReturnType<typeof getApiV10Tags>>, TError = unknown>(
 params?: GetApiV10TagsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10Tags>>,
          TError,
          Awaited<ReturnType<typeof getApiV10Tags>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10Tags<TData = Awaited<ReturnType<typeof getApiV10Tags>>, TError = unknown>(
 params?: GetApiV10TagsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all tags
 */

export function useGetApiV10Tags<TData = Awaited<ReturnType<typeof getApiV10Tags>>, TError = unknown>(
 params?: GetApiV10TagsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10TagsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get all tags
 */
export const prefetchGetApiV10TagsQuery = async <TData = Awaited<ReturnType<typeof getApiV10Tags>>, TError = unknown>(
 queryClient: QueryClient, params?: GetApiV10TagsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10Tags>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10TagsQueryOptions(params,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}



/**
 * Create a new tag record
 * @summary Create a tag
 */
export const postApiV10Tags = (
    tagMutate: TagMutate,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiV10Tags200>(
      {url: `/api/v1.0/tags`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: tagMutate, signal
    },
      );
    }
  


export const getPostApiV10TagsMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV10Tags>>, TError,{data: TagMutate}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiV10Tags>>, TError,{data: TagMutate}, TContext> => {

const mutationKey = ['postApiV10Tags'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV10Tags>>, {data: TagMutate}> = (props) => {
          const {data} = props ?? {};

          return  postApiV10Tags(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiV10TagsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV10Tags>>>
    export type PostApiV10TagsMutationBody = TagMutate
    export type PostApiV10TagsMutationError = unknown

    /**
 * @summary Create a tag
 */
export const usePostApiV10Tags = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV10Tags>>, TError,{data: TagMutate}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV10Tags>>,
        TError,
        {data: TagMutate},
        TContext
      > => {

      const mutationOptions = getPostApiV10TagsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    