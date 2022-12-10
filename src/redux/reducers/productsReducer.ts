import { createSlice } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'

export const productsSlide = createSlice({
  name: 'products',
  initialState: {
    products: [],
    chunksCounter: 0
  },
  reducers: {
  }
})