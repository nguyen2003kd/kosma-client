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
  GetApiV10QuestionFileParams,
  QuestionFileBulkMutate
} from '../models';

import { mainInstance } from '../mutator/custom-instance';





/**
 * Remove a specific file from a question
 * @summary Remove file from question
 */
export const deleteApiV10QuestionFileQuestionIdFileId = (
    questionId: string,
    fileId: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/questionFile/${questionId}/${fileId}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiV10QuestionFileQuestionIdFileIdMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10QuestionFileQuestionIdFileId>>, TError,{questionId: string;fileId: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10QuestionFileQuestionIdFileId>>, TError,{questionId: string;fileId: string}, TContext> => {

const mutationKey = ['deleteApiV10QuestionFileQuestionIdFileId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiV10QuestionFileQuestionIdFileId>>, {questionId: string;fileId: string}> = (props) => {
          const {questionId,fileId} = props ?? {};

          return  deleteApiV10QuestionFileQuestionIdFileId(questionId,fileId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiV10QuestionFileQuestionIdFileIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiV10QuestionFileQuestionIdFileId>>>
    
    export type DeleteApiV10QuestionFileQuestionIdFileIdMutationError = unknown

    /**
 * @summary Remove file from question
 */
export const useDeleteApiV10QuestionFileQuestionIdFileId = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiV10QuestionFileQuestionIdFileId>>, TError,{questionId: string;fileId: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiV10QuestionFileQuestionIdFileId>>,
        TError,
        {questionId: string;fileId: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiV10QuestionFileQuestionIdFileIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Retrieve all files attached to a specific question
 * @summary Get files by question
 */
export const getApiV10QuestionFileQuestionId = (
    questionId: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/questionFile/${questionId}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiV10QuestionFileQuestionIdInfiniteQueryKey = (questionId?: string,) => {
    return [
    'infinite', `/api/v1.0/questionFile/${questionId}`
    ] as const;
    }

export const getGetApiV10QuestionFileQuestionIdQueryKey = (questionId?: string,) => {
    return [
    `/api/v1.0/questionFile/${questionId}`
    ] as const;
    }

    
export const getGetApiV10QuestionFileQuestionIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>>, TError = unknown>(questionId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10QuestionFileQuestionIdInfiniteQueryKey(questionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>> = ({ signal }) => getApiV10QuestionFileQuestionId(questionId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(questionId),  retry: 3, retryDelay: 1000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10QuestionFileQuestionIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>>
export type GetApiV10QuestionFileQuestionIdInfiniteQueryError = unknown


export function useGetApiV10QuestionFileQuestionIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>>, TError = unknown>(
 questionId: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10QuestionFileQuestionIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>>, TError = unknown>(
 questionId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10QuestionFileQuestionIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>>, TError = unknown>(
 questionId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get files by question
 */

export function useGetApiV10QuestionFileQuestionIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>>, TError = unknown>(
 questionId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10QuestionFileQuestionIdInfiniteQueryOptions(questionId,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get files by question
 */
export const prefetchGetApiV10QuestionFileQuestionIdInfiniteQuery = async <TData = Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError = unknown>(
 queryClient: QueryClient, questionId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10QuestionFileQuestionIdInfiniteQueryOptions(questionId,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}



export const getGetApiV10QuestionFileQuestionIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError = unknown>(questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10QuestionFileQuestionIdQueryKey(questionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>> = ({ signal }) => getApiV10QuestionFileQuestionId(questionId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(questionId),  retry: 3, retryDelay: 1000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10QuestionFileQuestionIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>>
export type GetApiV10QuestionFileQuestionIdQueryError = unknown


export function useGetApiV10QuestionFileQuestionId<TData = Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError = unknown>(
 questionId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10QuestionFileQuestionId<TData = Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError = unknown>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>,
          TError,
          Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10QuestionFileQuestionId<TData = Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError = unknown>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get files by question
 */

export function useGetApiV10QuestionFileQuestionId<TData = Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError = unknown>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10QuestionFileQuestionIdQueryOptions(questionId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get files by question
 */
export const prefetchGetApiV10QuestionFileQuestionIdQuery = async <TData = Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError = unknown>(
 queryClient: QueryClient, questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFileQuestionId>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10QuestionFileQuestionIdQueryOptions(questionId,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}



/**
 * Add multiple files to one question in a single request
 * @summary Add files to a question (bulk)
 */
export const postApiV10QuestionFileBulk = (
    questionFileBulkMutate: QuestionFileBulkMutate,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/questionFile/bulk`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: questionFileBulkMutate, signal
    },
      );
    }
  


export const getPostApiV10QuestionFileBulkMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV10QuestionFileBulk>>, TError,{data: QuestionFileBulkMutate}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiV10QuestionFileBulk>>, TError,{data: QuestionFileBulkMutate}, TContext> => {

const mutationKey = ['postApiV10QuestionFileBulk'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiV10QuestionFileBulk>>, {data: QuestionFileBulkMutate}> = (props) => {
          const {data} = props ?? {};

          return  postApiV10QuestionFileBulk(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiV10QuestionFileBulkMutationResult = NonNullable<Awaited<ReturnType<typeof postApiV10QuestionFileBulk>>>
    export type PostApiV10QuestionFileBulkMutationBody = QuestionFileBulkMutate
    export type PostApiV10QuestionFileBulkMutationError = unknown

    /**
 * @summary Add files to a question (bulk)
 */
export const usePostApiV10QuestionFileBulk = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiV10QuestionFileBulk>>, TError,{data: QuestionFileBulkMutate}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiV10QuestionFileBulk>>,
        TError,
        {data: QuestionFileBulkMutate},
        TContext
      > => {

      const mutationOptions = getPostApiV10QuestionFileBulkMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Retrieve question file assignments with pagination, filtering and sorting
 * @summary Get all question files
 */
export const getApiV10QuestionFile = (
    params?: GetApiV10QuestionFileParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/v1.0/questionFile`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiV10QuestionFileInfiniteQueryKey = (params?: GetApiV10QuestionFileParams,) => {
    return [
    'infinite', `/api/v1.0/questionFile`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiV10QuestionFileQueryKey = (params?: GetApiV10QuestionFileParams,) => {
    return [
    `/api/v1.0/questionFile`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiV10QuestionFileInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFile>>>, TError = unknown>(params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10QuestionFileInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10QuestionFile>>> = ({ signal }) => getApiV10QuestionFile(params, signal);

      

      

   return  { queryKey, queryFn,   retry: 3, retryDelay: 1000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10QuestionFileInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10QuestionFile>>>
export type GetApiV10QuestionFileInfiniteQueryError = unknown


export function useGetApiV10QuestionFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFile>>>, TError = unknown>(
 params: undefined |  GetApiV10QuestionFileParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10QuestionFile>>,
          TError,
          Awaited<ReturnType<typeof getApiV10QuestionFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10QuestionFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFile>>>, TError = unknown>(
 params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10QuestionFile>>,
          TError,
          Awaited<ReturnType<typeof getApiV10QuestionFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10QuestionFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFile>>>, TError = unknown>(
 params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all question files
 */

export function useGetApiV10QuestionFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiV10QuestionFile>>>, TError = unknown>(
 params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10QuestionFileInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get all question files
 */
export const prefetchGetApiV10QuestionFileInfiniteQuery = async <TData = Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError = unknown>(
 queryClient: QueryClient, params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10QuestionFileInfiniteQueryOptions(params,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}



export const getGetApiV10QuestionFileQueryOptions = <TData = Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError = unknown>(params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiV10QuestionFileQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiV10QuestionFile>>> = ({ signal }) => getApiV10QuestionFile(params, signal);

      

      

   return  { queryKey, queryFn,   retry: 3, retryDelay: 1000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiV10QuestionFileQueryResult = NonNullable<Awaited<ReturnType<typeof getApiV10QuestionFile>>>
export type GetApiV10QuestionFileQueryError = unknown


export function useGetApiV10QuestionFile<TData = Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError = unknown>(
 params: undefined |  GetApiV10QuestionFileParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10QuestionFile>>,
          TError,
          Awaited<ReturnType<typeof getApiV10QuestionFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10QuestionFile<TData = Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError = unknown>(
 params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiV10QuestionFile>>,
          TError,
          Awaited<ReturnType<typeof getApiV10QuestionFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiV10QuestionFile<TData = Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError = unknown>(
 params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all question files
 */

export function useGetApiV10QuestionFile<TData = Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError = unknown>(
 params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiV10QuestionFileQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get all question files
 */
export const prefetchGetApiV10QuestionFileQuery = async <TData = Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError = unknown>(
 queryClient: QueryClient, params?: GetApiV10QuestionFileParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiV10QuestionFile>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetApiV10QuestionFileQueryOptions(params,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}



