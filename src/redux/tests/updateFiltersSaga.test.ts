import { updateFiltersSaga, getProductsSaga } from "../sagas"
import { call, putResolve } from 'redux-saga/effects'
import { addFilters, removeFilters } from "../reducers/filtersReducer"
import { clearChunks, clearProducts } from "../reducers/productsReducer"
import { UPDATE_FILTERS } from "../constants"

describe('updateFiltersSaga', () => {
  it('should clear products and chunks and add new filters', () => {
    const payload = {
      remove: false,
      filters: ['electronics']
    }
    const gen = updateFiltersSaga({
      type: UPDATE_FILTERS,
      payload
    })

    expect(gen.next().value).toEqual(putResolve(addFilters(payload.filters)))

    expect(gen.next().value).toEqual(putResolve(clearProducts()))

    expect(gen.next().value).toEqual(putResolve(clearChunks()))

    expect(JSON.stringify(gen.next().value)).toEqual(JSON.stringify(getProductsSaga()))
    
    expect(gen.next().done).toEqual(true)
  })

  it('should clear products and chunks and remove new filters', () => {
    const payload = {
      remove: true,
      filters: ['electronics']
    }
    const gen = updateFiltersSaga({
      type: UPDATE_FILTERS,
      payload
    })

    expect(gen.next().value).toEqual(putResolve(removeFilters(payload.filters)))

    expect(gen.next().value).toEqual(putResolve(clearProducts()))

    expect(gen.next().value).toEqual(putResolve(clearChunks()))

    expect(JSON.stringify(gen.next().value)).toEqual(JSON.stringify(getProductsSaga()))

    expect(gen.next().done).toEqual(true)
  })
})