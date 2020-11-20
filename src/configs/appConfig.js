/**
 * app initial info
 */
const appInfo = {
  name: 'Jala Udang',
  version: '1.0.0',
  environment: 'dev',
};

/**
 * app initial environment
 */
const appEnvironment = {
  dev: {
    api: {
      name: "Jala API",
      baseUrl: 'https://app.jala.tech',
      credentials: {
        client_secret: "8VrhzrEXjV5JcRfmz1pQ8AE1mDnISeZ8hbBqi56b",
        scope: "*",
        grant_type: "client_credentials",
        client_id: 3
      }
    },
  }
};

/**
 * app initial active config
 */
const appActiveConfig = appEnvironment[appInfo.environment];

export { appInfo, appEnvironment, appActiveConfig };
