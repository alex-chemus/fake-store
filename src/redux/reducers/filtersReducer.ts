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
    setAllFilters(state = initialState, action: PayloadAction<string[] | undefined>) {
      if (action.payload === undefined) return
      state.allFilters = [
        ...state.allFilters,
        ...action.payload.map(f => f.toLocaleLowerCase())
      ]
    },

    addFilters(state = initialState, action: PayloadAction<string[]>) {
      action.payload
        .map(filter => filter.toLocaleLowerCase())
        .forEach(filter => {
          if (state.allFilters.includes(filter))
            state.filters.push(filter)
        })
    },

    removeFilters(state = initialState, action: PayloadAction<string[]>) {
      action.payload
        .map(filter => filter.toLocaleLowerCase())
        .forEach(filter => {
          const index = state.filters.findIndex(f => f === filter)
          if (index >= 0)
            state.filters.splice(index, 1)
        })
    }
  }
})

export const { setAllFilters, addFilters, removeFilters } = filtersReducer.actions

export default filtersReducer.reducer