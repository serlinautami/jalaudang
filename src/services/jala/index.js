import { API, appActiveConfig } from '../../configs';
import { setStorage } from '../../utils';

const initialParams = {
  with:'creator,species,region,currency',
  sort: 'size_100|creator.name,desc',
  country_id: 'ID',
  currency_id: 'IDR',
  not_null:'size_100',
  not_zero:'size_100'
}


/**
 * @name authentication
 * @description Function api untuk memanggil autentikasi pada api JALA
 */
export const authentication = async () => {
  try {
    const requestPayload = {
      body: { ...appActiveConfig.api.credentials }
    }
    // pemanggilan api untuk autentikasi
    const { data } = await API.authentication(requestPayload);
    
    // simpan data autentikasi kedalam penyimpanan lokal
    setStorage('authentication', data);

    // beri balikan berupa data;
    return data;
  } catch (err) {

    // lempar sebagai error
    throw err;
  }
}


/**
 * @name getPriceList
 * @description Function api untuk memanggil daftar harga pada api JALA
 * @param {*} payload
 */
export const getPriceList = async (payload = {}) => {
  try {
    const requestPayload = {
      ...payload,
      params: {
        ...initialParams,
        ...payload.params
      }
    }
  
    // pemanggilan api untuk daftar harga udang
    const { data } = await API.shrimPrices(requestPayload);

    // beri baikan data
    return data;
  } catch (err) {

    // lempar sebagai error
    throw err;
  }
}



/**
 * @name getPriceDetail
 * @description Function api untuk memanggil detail dari daftar harga pada api JALA
 * @param {*} payload
 */
export const getPriceDetail = async (id, payload) => {
  try {
    const requestPayload = {
      ...payload,
      path: id,
      params: {
        with: initialParams.with
      }
    }

    // pemanggilan api untuk detail harga udang
    const { data } = await API.shrimPrices(requestPayload);

    // beri balikan berupa data
    return data
  } catch (err) {
    throw err;
  }
}


/**
 * @name getRegionList
 * @description Function api untuk memanggil daftar wilayah yang tersedia
 * @param {*} payload
 */
export const getRegionList = async (payload) => {
  try {
    const requestPayload = {
      ...payload,
    }
    
    // pemanggilan api untuk daftar wilayah
    const response = await API.region(requestPayload);

    return response
  } catch (err) {
    throw err;
  }
}


/**
 * @name getRegionDetail
 * @description Function api untuk memanggil detail dari daftar wilayah yang tersedia
 * @param {*} payload
 */
export const getRegionDetail = async (id, payload) => {
  try {
    const requestPayload = {
      ...payload,
      path: id
    }
    const response = await API.region(requestPayload);
    return response
  } catch (err) {
    throw err;
  }
}


/**
 * @name getSpeciesList
 * @description Function api untuk memanggil daftar spesies yang tersedia
 * @param {*} payload
 */
export const getSpeciesList = async (payload) => {
  try {
    const requestPayload = {
      ...payload,
    }

    const response = await API.species(requestPayload);
    return response
  } catch (err) {
    throw err;
  }
}


/**
 * @name getSpeciesList
 * @description Function api untuk memanggil daftar spesies yang tersedia
 * @param {*} payload
 */
export const getSpeciesDetail = async (id, payload) => {
  try {
    const requestPayload = {
      ...payload,
      path: id,
    }
    const response = await API.species(requestPayload);
    return response
  } catch (err) {
    throw err;
  }
}