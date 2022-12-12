import { loadProductsSaga } from "../sagas"
import { select, call, put } from 'redux-saga/effects'
import { getProducts } from "@/api"
import { addProducts, clearChunks, incrementChunks } from '../reducers/productsReducer'

describe('getProductsSaga', () => {
  it('should get products', () => {
    const gen = loadProductsSaga(false)
    const chunksCounter = 1
    const chunkLength = 20
    const filters = ['electronics']
    const products = [{
      id: 1,
      title: 'title',
      price: '1.0',
      category: 'electronics',
      description: 'description',
      image: ''
    }]

    // шаг 1. получить кол-во чанков
    expect(gen.next().value).toEqual(
      select(state => state.products.chunksCounter)
    )

    // шаг 2. получить длину чанка и передать кол-во чанков
    expect(gen.next(chunksCounter).value).toEqual(
      select(state => state.producs.chunkLength)
    )

    // шаг 3. получить текущие фильтры и передать длина чанка
    expect(gen.next(chunkLength).value).toEqual(
      select(state => state.filters.filters)
    )

    // шаг 4. сделать вызов api и передать текущие фильтры
    expect(gen.next(filters).value).toEqual(
      call(getProducts, {
        filters: ['electronics'],
        limit: 20
      })
    )

    // шаг 5. обновить товары в redux
    expect(gen.next(products).value).toEqual(
      put(addProducts(products))
    )

    expect(gen.next().value).toEqual(
      put(clearChunks())
    )

    expect(gen.next().done).toEqual(true)
  })
})