import baseConfig from "@/configs/base";

const links = {
  backendHost: baseConfig.backendDomain,
  apiEndpoint: `${baseConfig.backendDomain}/api/v1.0`,
  storageEndpoint: baseConfig.backendDomain,
} as const;

export default links;