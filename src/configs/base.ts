const baseConfig = {
  backendDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'https://kosmo.vietprodev.com',
  frontendDomain: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || 'https://kosmo.vietprodev.com',
  imgEndpointDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'https://kosmo.vietprodev.com',
};

export default baseConfig;
