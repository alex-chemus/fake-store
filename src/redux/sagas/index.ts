import {
  select, takeLeading, call, put, 
  putResolve, SelectEffect, PutEffect, CallEffect, all, fork,
  actionChannel,
  take,
  ActionPattern
} from "redux-saga/effects"
import {
  GET_ALL_FILTERS, GET_PRODUCTS, UPDATE_FILTERS
} from "../constants"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { ActionChannelEffect } from "redux-saga/effects"
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

export function* watchProductsSata() {
  yield takeLeading(GET_PRODUCTS, getProductsSaga) 
}

export function* watchAllFiltersSaga() {
  yield takeLeading(GET_ALL_FILTERS, getAllFiltersSaga) 
}

export function* watchUpdateFiltersSaga() {
  const channel = (yield actionChannel(UPDATE_FILTERS)) as ActionPattern<PayloadAction<string | null>>
  while (true) {
    const action: PayloadAction<string | null> = yield take(channel)
    yield call(updateFiltersSaga, action)
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchProductsSata),
    fork(watchAllFiltersSaga),
    fork(watchUpdateFiltersSaga)
  ])
}