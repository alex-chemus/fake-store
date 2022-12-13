import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Product = {
  id: number,
  title: string,
  price: string,
  category: string,
  description: string,
  image: string
}

const initialState = {
  products: [] as Product[],
  chunksCounter: 0,
  chunkLength: 20 as const
}

export type ProductsState = typeof initialState

export const productsSlide = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts(state = initialState, action: PayloadAction<Product[]>) {
      state.products = [
        ...state.products.filter(product => {
          return action.payload.every(p => p.id !== product.id)
        }),
        ...action.payload
      ]
    },

    clearProducts(state = initialState) {
      state.products = []
    },

    incrementChunks(state = initialState) {
      state.chunksCounter++
    },

    clearChunks(state = initialState) {
      state.chunksCounter = 0
    }
  }
})

export const { addProducts, clearProducts, incrementChunks, clearChunks } = productsSlide.actions

export default productsSlide.reducer