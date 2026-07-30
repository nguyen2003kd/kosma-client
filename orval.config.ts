import baseConfig from './src/configs/base'
import { defineConfig } from 'orval'

const orvalConfig = defineConfig({
  'kosmo-fe': {
    output: {
      mode: 'tags',
      target: 'src/api/endpoints',
      schemas: 'src/api/models',
      client: 'react-query',
      clean: true,
      override: {
        query: {
          version: 5,
          useInfinite: true,
          usePrefetch: true,
          options: {
            retry: 3,
            retryDelay: 1000,
          }
        },
        mutator: {
          path: 'src/api/mutator/custom-instance.ts',
          name: 'mainInstance'
        },

        header: () => '/* eslint-disable */\r\n',
        operations: {
          postSystemBackup: {
            mutator: {
              path: 'src/api/mutator/fetch-instance.ts',
              name: 'fetchInstance'
            }
          }
        }
      }
    },
    input: {
      target: `${baseConfig.backendDomain}/swagger-output.json`,
      filters: {
        tags: undefined
      }
    }
  }
})

export default orvalConfig