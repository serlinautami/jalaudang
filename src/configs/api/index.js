import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};

API.authentication = apiRequest.post(apiEndpoint.auth, false);
API.shrimPrices = apiRequest.get(apiEndpoint.shrimPrices, true);
API.region = apiRequest.get(apiEndpoint.region, true);
API.species = apiRequest.get(apiEndpoint.species, true);

export default API;
