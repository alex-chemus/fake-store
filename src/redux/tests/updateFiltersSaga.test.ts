import { updateFiltersSaga, getProductsSaga } from "../sagas"
import { putResolve } from 'redux-saga/effects'
import { updateAppliedFilter } from "../reducers/filtersReducer"
import { clearChunks } from "../reducers/productsReducer"
import { updateFilters } from "../sagas/actionCreators"

describe('updateFiltersSaga', () => {
  it('should clear products and chunks and update appliedFilter', () => {
    const gen = updateFiltersSaga(updateFilters('electronics'))

    expect(gen.next().value).toEqual(putResolve(updateAppliedFilter('electronics')))

    expect(gen.next().value).toEqual(putResolve(clearChunks()))

    expect(JSON.stringify(gen.next().value)).toEqual(JSON.stringify(getProductsSaga()))
    
    expect(gen.next().done).toEqual(true)
  })
})