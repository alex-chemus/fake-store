import {
  select, takeLeading, call, put, putResolve
} from "redux-saga/effects"
import {
  GET_ALL_FILTERS, GET_PRODUCTS, UPDATE_FILTERS
} from "../constants"
import type { PayloadAction } from "@reduxjs/toolkit"
import { State } from "../store"
import { getFilters, getProducts } from "@/api"
import { Product, addProducts, incrementChunks, clearChunks } from "../reducers/productsReducer"
import { updateAppliedFilter, setAllFilters } from "../reducers/filtersReducer"

export function* getProductsSaga() {
  const chunksCounter: number = yield select((state: State) => state.products.chunksCounter)
  const chunkLength: number = yield select((state: State) => state.products.chunkLength)
  const appliedFilter: string | null = yield select((state: State) => state.filters.appliedFilter)
  
  const products: Product[] = yield call(getProducts, {
    filter: appliedFilter,
    limit: chunkLength * (chunksCounter+1)
  })

  yield put(addProducts(products))
  yield put(incrementChunks())
}

export function* getAllFiltersSaga() {
  const filters: string[] = yield call(getFilters)
  yield put(setAllFilters(filters))
}

export function* updateFiltersSaga(action: PayloadAction<string | null>) {
  if (!action.payload) return
  
  yield putResolve(updateAppliedFilter(action.payload))

  yield putResolve(clearChunks())

  yield getProductsSaga()
}

export function* watchSaga() {
  yield takeLeading(GET_PRODUCTS, getProductsSaga)
  yield takeLeading(GET_ALL_FILTERS, getAllFiltersSaga)
  yield takeLeading(UPDATE_FILTERS, updateFiltersSaga)
}

export default function* rootSaga() {
  yield watchSaga()
}