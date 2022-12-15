import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  allFilters: [] as string[],
  appliedFilter: null as (string | null)
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

    updateAppliedFilter(state = initialState, action: PayloadAction<string | null>) {
      if (action.payload === null)
        state.appliedFilter = null
      else if (state.allFilters.includes(action.payload.toLocaleLowerCase()))
        state.appliedFilter = action.payload.toLocaleLowerCase()
    }
  }
})

export const { setAllFilters, updateAppliedFilter } = filtersReducer.actions

export default filtersReducer.reducer