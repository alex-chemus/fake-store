import reducer, {
  addProducts, clearProducts, increaseChunksCounter
} from '../reducers/productsReducer'

test('productsReducer', () => {
  it('should return the initial state', () => {
    const initialState = undefined
    const action = { type: undefined }
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    })
  })

  it("should add products if products is empty", () => {
    const initialState = undefined
    const product1 = {
      id: 1,
      title: 'title1',
      price: '1.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const action = addProducts([product1])
    expect(reducer(initialState, action)).toEqual({
      products: [product1],
      chunksCounter: 0,
      chunkLength: 20,
    })
  })

  it("should add products if products isn't empty", () => {
    const product1 = {
      id: 1,
      title: 'title1',
      price: '1.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const product2 = {
      id: 2,
      title: 'title2',
      price: '2.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const initialState = {
      products: [product1],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = addProducts([product2])
    expect(reducer(initialState, action)).toEqual({
      products: [product1, product2],
      chunksCounter: 0,
      chunkLength: 20,
    })
  })

  it("should replace produts with the same id", () => {
    const product1 = {
      id: 1,
      title: 'title1',
      price: '1.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const product2 = {
      id: 1,
      title: 'title2',
      price: '2.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const initialState = {
      products: [product1],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = addProducts([product2])
    expect(reducer(initialState, action)).toEqual({
      products: [product2],
      chunksCounter: 0,
      chunkLength: 20,
    })
  })

  it("should clear products if 'products' isn't empty", () => {
    const product1 = {
      id: 1,
      title: 'title1',
      price: '1.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const initialState = {
      products: [product1],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = clearProducts()
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    })
  })

  it("should clear products if 'products' is empty", () => {
    const initialState = {
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = clearProducts()
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    })
  })

  it("should increase 'chunksCounter'", () => {
    const initialState = {
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = increaseChunksCounter()
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 1,
      chunkLength: 20,
    })
  })
})