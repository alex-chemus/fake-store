import {
  select, takeLeading, call, put, 
  putResolve, SelectEffect, PutEffect, CallEffect
} from "redux-saga/effects"
import {
  GET_ALL_FILTERS, GET_PRODUCTS, UPDATE_FILTERS
} from "../constants"
import type { PayloadAction } from "@reduxjs/toolkit"
import { State } from "../store"
import { getFilters, getProducts } from "@/api"
import { Product, addProducts, incrementChunks, clearChunks } from "../reducers/productsReducer"
import { updateAppliedFilter, setAllFilters } from "../reducers/filtersReducer"

export function* getProductsSaga(): Generator<
  SelectEffect | PutEffect | CallEffect,
  void,
  number | string | null | Product[]
> {
  const chunksCounter = (yield select((state: State) => state.products.chunksCounter)) as number
  const chunkLength = (yield select((state: State) => state.products.chunkLength)) as number
  const appliedFilter = (yield select((state: State) => state.filters.appliedFilter)) as string | null
  
  const products = (yield call(getProducts, {
    filter: appliedFilter,
    limit: chunkLength * (chunksCounter+1)
  })) as Product[]

  yield put(addProducts(products))
  yield put(incrementChunks())
}

export function* getAllFiltersSaga() {
  const filters: string[] = yield call(getFilters)
  yield put(setAllFilters(filters))
}

export function* updateFiltersSaga(action: PayloadAction<string | null>) { 
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