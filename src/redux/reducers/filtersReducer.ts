import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  allFilters: [] as string[],
  filters: [] as string[]
}

export type FiltersState = typeof initialState

export const filtersReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAllFilters(state = initialState, action: PayloadAction<string[] | undefined>) {},

    addFilters(state = initialState, action: PayloadAction<string[] | undefined>) {},

    removeFilters(state = initialState, action: PayloadAction<string[] | undefined>) {}
  }
})

export const { setAllFilters, addFilters, removeFilters } = filtersReducer.actions

export default filtersReducer.reducer