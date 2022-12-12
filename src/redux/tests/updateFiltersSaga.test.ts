import { updateFiltersSaga, loadProductsSaga } from "../sagas"
import { call } from 'redux-saga/effects'
import { addFilters, removeFilters } from "../reducers/filtersReducer"
import { clearChunks, clearProducts } from "../reducers/productsReducer"

test('updateFiltersSaga', () => {
  it('should clear products and chunks and add new filters', () => {
    const gen = updateFiltersSaga()
    const newFilters = ['electronics']

    expect(gen.next().value).toEqual(call(addFilters, newFilters))

    expect(gen.next().value).toEqual(call(clearProducts))

    expect(gen.next().value).toEqual(call(clearChunks))

    expect(gen.next().value).toEqual(loadProductsSaga(true))

    expect(gen.next().done).toEqual(true)
  })

  it('should clear products and chunks and remove new filters', () => {
    const gen = updateFiltersSaga()
    const oldFilters = ['electronics']

    expect(gen.next().value).toEqual(call(removeFilters, oldFilters))

    expect(gen.next().value).toEqual(call(clearProducts))

    expect(gen.next().value).toEqual(call(clearChunks))

    expect(gen.next().value).toEqual(loadProductsSaga(true))

    expect(gen.next().done).toEqual(true)
  })
})