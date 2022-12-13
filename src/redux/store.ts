import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./reducers/productsReducer"
import filtersReducer from "./reducers/filtersReducer"
import rootSaga from "./sagas"
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch