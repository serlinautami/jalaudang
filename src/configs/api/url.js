import { appActiveConfig } from '../appConfig';

// api endpoint list
const apiEndpoint = {
  auth: `${appActiveConfig.api.baseUrl}/oauth/token`,
  shrimPrices: `${appActiveConfig.api.baseUrl}/api/shrimp_prices`,
  region: `${appActiveConfig.api.baseUrl}/api/regions`,
  species: `${appActiveConfig.api.baseUrl}/api/species`,
}

export { apiEndpoint };
