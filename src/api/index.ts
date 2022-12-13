export const getProducts = async ({ filter, limit }: { filter: string | null, limit: number }) => {
  if (filter) {
    const res = await fetch(`https://fakestoreapi.com/products/category/${filter}?limit=${limit}`)
    return await res.json()
  } else {
    const res = await fetch(`'https://fakestoreapi.com/products?limit=${limit}`)
    return await res.json()
  }
}

export const getFilters = async () => {
  const res = await fetch('https://fakestoreapi.com/products/categories')
  return await res.json()
}