import reducer, {
  setAllFilters, addFilters, removeFilters
} from '../reducers/filtersReducer'
import type { FiltersState } from '../reducers/filtersReducer'

describe('filtersReducer', () => {
  it("should return the initial state", () => {
    const initialState = undefined
    const action = { type: undefined }
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      filters: []
    })
  })

  it("should set 'allFilters'", () => {
    const initialState = undefined
    const action = setAllFilters(['electronics', 'jewelery'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics', 'jewelery'],
      filters: []
    } as FiltersState)
  })

  it("shouldn't set 'allFilters' if the array is empty", () => {
    const initialState = undefined
    const action = setAllFilters()
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      filters: []
    } as FiltersState)
  })

  it("should set new 'allFilters' if 'allFilters' isn't empty", () => {
    const initialState: FiltersState = {
      allFilters: ["electronics"],
      filters: []
    }
    const action = setAllFilters(["jewelery"])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ["electronics", "jewelery"],
      filters: []
    } as FiltersState)
  })

  it("should set filter values to lowecase", () => {
    const initialState: FiltersState = {
      allFilters: [],
      filters: []
    }
    const action = setAllFilters(['Electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: []
    } as FiltersState)
  })

  it("should add filters if they are in 'allFilters'", () => {
    const initialState: FiltersState = {
      allFilters: ['electronics'],
      filters: []
    }
    const action = addFilters(['electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: ['electronics']
    } as FiltersState)
  })

  it ("shouldn't add filters if they aren't in 'allFilters'", () => {
    const initialState = undefined
    const action = addFilters(['electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      filters: []
    } as FiltersState)
  })

  it("should add filters case-insensitively", () => {
    const initialState: FiltersState = {
      allFilters: ['electronics'],
      filters: []
    }
    const action = addFilters(['Electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: ['electronics']
    } as FiltersState)
  })

  it("should remove filters if they are in 'filters'", () => {
    const initialState: FiltersState = {
      allFilters: ['electronics'],
      filters: ['electronics']
    }
    const action = removeFilters(['electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: []
    } as FiltersState)
  })

  it("shouldn't remove filters if they aren't in 'filters'", () => {
    const initialState: FiltersState = {
      allFilters: ['electronics'],
      filters: []
    }
    const action = removeFilters(['electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: []
    } as FiltersState)
  })

  it("should remove filters case-insensitively", () => {
    const initialState: FiltersState = {
      allFilters: ['electronics'],
      filters: ['electronics']
    }
    const action = removeFilters(['Electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: []
    } as FiltersState)
  })
})