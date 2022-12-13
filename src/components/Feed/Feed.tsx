import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/redux/store'
import { getProducts } from '@/redux/sagas/actionCreators'

const Feed: FC = () => {
  const products = useSelector((state: State) => state.products.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <section>
      {products.map((product, i) => {
        return (
          <article key={i}>
            <img height="200" src={product.image} alt={product.title} />
            <p>{product.title}</p>
            <small>{product.price}$</small>
          </article>
        )
      })}
    </section>
  )
}

export default Feed