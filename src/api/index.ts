import { Product } from "@/redux/reducers/productsReducer"

export const getProducts = async ({ filters, limit }: { filters: string[], limit: number }) => {
  
}

export const getFilters = async () => {
  const res = await fetch('https://fakestoreapi.com/products/categories')
  return await res.json()
}