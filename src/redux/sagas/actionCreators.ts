import { GET_PRODUCTS, GET_ALL_FILTERS, UPDATE_FILTERS } from '../constants'

export const getProducts = () => {
  return { type: GET_PRODUCTS }
}

export const getAllFilters = () => {
  return { type: GET_ALL_FILTERS }
}

export const updateFilters = (payload: string | null) => {
  return { type: UPDATE_FILTERS, payload }
}