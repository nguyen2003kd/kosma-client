module.exports = {
  apps: [
    {
      name: "kosmo-frontend-client-staging",
      script: "pnpm",
      args: "start",
      cwd: "/opt/kosmo-staging/kosmo-frontend",
      env: {
        NODE_ENV: "staging",
        PORT: 3034
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M"
    }
  ]
};