import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./reducers/productsReducer"
import filtersReducer from "./reducers/filtersReducer"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer
  }
})


export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch