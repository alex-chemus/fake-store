import reducer, {
  setAllFilters, addFilters, removeFilters
} from '../reducers/filtersReducer'

test('categoriesReducer', () => {
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
    })
  })

  it("shouldn't set 'allFilters' if the array is empty", () => {
    const initialState = undefined
    const action = setAllFilters()
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      filters: []
    })
  })

  it("should set new 'allFilters' if 'allFilters' isn't empty", () => {
    const initialState = {
      allFilters: ["electronics"],
      filters: []
    }
    const action = setAllFilters(["jewelery"])
    expect(reducer(initialState, action)).toEqual({
      allCategories: ["electronics", "jewelery"],
      currentCategories: []
    })
  })

  it("should set filter values to lowecase", () => {
    const initialState = {
      allFilters: [],
      filters: []
    }
    const action = setAllFilters(['Electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: []
    })
  })

  it("should add filters if they are in 'allFilters'", () => {
    const initialState = {
      allFilters: ['electronics'],
      filters: []
    }
    const action = addFilters(['electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: ['electronics']
    })
  })

  it ("shouldn't add filters if they aren't in 'allFilters'", () => {
    const initialState = undefined
    const action = addFilters(['electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      filters: []
    })
  })

  it("should add filters case-insensitively", () => {
    const initialState = {
      allFilters: ['electronics'],
      filters: []
    }
    const action = addFilters(['Electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: ['electronics']
    })
  })

  it("should remove filters if they are in 'filters'", () => {
    const initialState = {
      allFilters: ['electronics'],
      filters: ['electronics']
    }
    const action = removeFilters(['electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: [],
      filters: []
    })
  })

  it("shouldn't remove filters if they aren't in 'filters'", () => {
    const initialState = {
      allFilters: ['electronics'],
      filters: []
    }
    const action = removeFilters(['electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: []
    })
  })

  it("should remove filters case-insensitively", () => {
    const initialState = {
      allFilters: ['electronics'],
      filters: ['electronics']
    }
    const action = removeFilters(['Electronics'])
    expect(reducer(initialState, action)).toEqual({
      allFilters: ['electronics'],
      filters: []
    })
  })
})