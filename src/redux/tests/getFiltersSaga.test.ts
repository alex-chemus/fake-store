import { getAllFiltersSaga } from "../sagas"
import { call, put } from 'redux-saga/effects'
import { setAllFilters } from '../reducers/filtersReducer'
import { getFilters } from "@/api"

describe('getAllFiltersSaga', () => {
  test('should load all possible filters', () => {
    const gen = getAllFiltersSaga()
    const filters = ['electronics', 'jewelery']

    expect(gen.next().value).toEqual(call(getFilters))
    expect(gen.next(filters).value).toEqual(
      put(setAllFilters(filters))
    )

    expect(gen.next().done).toEqual(true)
  })
})