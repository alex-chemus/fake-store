import reducer, {
  setAllFilters, updateAppliedFilter //addFilters, removeFilters
} from '../reducers/filtersReducer'
import type { FiltersState } from '../reducers/filtersReducer'

describe('filtersReducer', () => {
  it("should return the initial state", () => {
    const initialState = undefined
    const action = { type: undefined }
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      appliedFilter: null
    })
  })

  it("should set 'allFilters'", () => {
    const initialState = undefined
    const action = setAllFilters(['electronics', 'jewelery'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics', 'jewelery'],
      appliedFilter: null
    } as FiltersState)
  })

  it("shouldn't set 'allFilters' if the array is empty", () => {
    const initialState = undefined
    const action = setAllFilters()
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      appliedFilter: null
    } as FiltersState)
  })

  it("should set new 'allFilters' if 'allFilters' isn't empty", () => {
    const initialState: FiltersState = {
      allFilters: ["electronics"],
      appliedFilter: null
    }
    const action = setAllFilters(["jewelery"])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ["electronics", "jewelery"],
      appliedFilter: null
    } as FiltersState)
  })

  it("should set filter values to lowecase", () => {
    const initialState: FiltersState = {
      allFilters: [],
      appliedFilter: null
    }
    const action = setAllFilters(['Electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      appliedFilter: null
    } as FiltersState)
  })

  it("should update 'appliedFilter' if the filter is in 'allFilters'", () => {
    const initialState: FiltersState = {
      allFilters: ['electronics'],
      appliedFilter: null
    }
    //const action = addFilters(['electronics'])
    const action = updateAppliedFilter('electronics')
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      appliedFilter: 'electronics'
    } as FiltersState)
  })

  it ("shouldn't update 'appliedFilter' if the filter isn't in 'allFilters'", () => {
    const initialState = undefined
    const action = updateAppliedFilter('electronics')
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      appliedFilter: null
    } as FiltersState)
  })

  it("should replace previous 'appliedFilter'", () => {
    const initialState: FiltersState = {
      allFilters: ['electronics', 'jewelery'],
      appliedFilter: 'jewelery'
    }
    const action = updateAppliedFilter('electronics')
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics', 'jewelery'],
      appliedFilter: 'electronics'
    } as FiltersState)
  })

  it("should update 'appliedFilter' case-insensitively", () => {
    const initialState: FiltersState = {
      allFilters: ['electronics'],
      appliedFilter: null
    }
    const action = updateAppliedFilter('Electronics')
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      appliedFilter: 'electronics'
    } as FiltersState)
  })
})