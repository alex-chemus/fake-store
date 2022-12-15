import { getProductsSaga } from "../sagas"
import { call, put, Effect } from 'redux-saga/effects'
import { getProducts } from "@/api"
import { addProducts, incrementChunks } from '../reducers/productsReducer'

describe('getProductsSaga', () => {
  it('should get products', () => {
    const gen = getProductsSaga()
    const chunksCounter = 1
    const chunkLength = 20
    const filter = 'electronics'
    const products = [{
      id: 1,
      title: 'title',
      price: '1.0',
      category: 'electronics',
      description: 'description',
      image: ''
    }]

    // шаг 1. получить кол-во чанков
    expect((gen.next().value as Effect).type).toEqual("SELECT")

    // шаг 2. получить длину чанка и передать кол-во чанков
    expect((gen.next(chunksCounter as any).value as Effect).type).toEqual("SELECT")

    // шаг 3. получить текущие фильтры и передать длина чанка
    expect((gen.next(chunkLength as any).value as Effect).type).toEqual("SELECT")

    // шаг 4. сделать вызов api и передать текущие фильтры
    expect(gen.next(filter as any).value).toEqual(
      call(getProducts, {
        filter,
        limit: chunkLength * (chunksCounter+1)
      })
    )

    // шаг 5. обновить товары в redux
    expect(gen.next(products as any).value).toEqual(
      put(addProducts(products))
    )

    expect(gen.next().value).toEqual(
      put(incrementChunks())
    )

    expect(gen.next().done).toEqual(true)
  })
})