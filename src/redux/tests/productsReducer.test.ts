import reducer, {
  addProducts, clearProducts, incrementChunks, clearChunks
} from '../reducers/productsReducer'
import type { ProductsState, Product } from '../reducers/productsReducer'

test('productsReducer', () => {
  it('should return the initial state', () => {
    const initialState = undefined
    const action = { type: undefined }
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    } as ProductsState)
  })

  it("should add products if products is empty", () => {
    const initialState = undefined
    const product1: Product = {
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
    } as ProductsState)
  })

  it("should add products if products isn't empty", () => {
    const product1: Product = {
      id: 1,
      title: 'title1',
      price: '1.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const product2: Product = {
      id: 2,
      title: 'title2',
      price: '2.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const initialState: ProductsState = {
      products: [product1],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = addProducts([product2])
    expect(reducer(initialState, action)).toEqual({
      products: [product1, product2],
      chunksCounter: 0,
      chunkLength: 20,
    } as ProductsState)
  })

  it("should replace produts with the same id", () => {
    const product1: Product = {
      id: 1,
      title: 'title1',
      price: '1.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const product2: Product = {
      id: 1,
      title: 'title2',
      price: '2.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const initialState: ProductsState = {
      products: [product1],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = addProducts([product2])
    expect(reducer(initialState, action)).toEqual({
      products: [product2],
      chunksCounter: 0,
      chunkLength: 20,
    } as ProductsState)
  })

  it("should clear products if 'products' isn't empty", () => {
    const product1: Product = {
      id: 1,
      title: 'title1',
      price: '1.0',
      category: 'category',
      description: 'description',
      image: ''
    }
    const initialState: ProductsState = {
      products: [product1],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = clearProducts()
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    } as ProductsState)
  })

  it("should clear products if 'products' is empty", () => {
    const initialState: ProductsState = {
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = clearProducts()
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    } as ProductsState)
  })

  it("should increase 'chunksCounter'", () => {
    const initialState: ProductsState = {
      products: [],
      chunksCounter: 0,
      chunkLength: 20,
    }
    const action = incrementChunks()
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 1,
      chunkLength: 20,
    } as ProductsState)
  })

  it("should clear chunksCounter", () => {
    const initialState: ProductsState = {
      products: [],
      chunksCounter: 2,
      chunkLength: 20
    }
    const action = clearChunks()
    expect(reducer(initialState, action)).toEqual({
      products: [],
      chunksCounter: 0,
      chunkLength: 20
    } as ProductsState)
  })
})