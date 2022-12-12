import { loadFiltersSaga } from "../sagas"
import { call, put } from 'redux-saga/effects'
import { setAllFilters } from '../reducers/filtersReducer'
import { getFilters } from "@/api"

describe('loadFiltersSaga', () => {
  test('should load all possible filters', () => {
    const gen = loadFiltersSaga()
    const filters = ['electronics', 'jewelery']

    expect(gen.next().value).toEqual(call(getFilters))
    expect(gen.next(filters).value).toEqual(
      put(setAllFilters())
    )

    expect(gen.next().done).toEqual(true)
  })
})