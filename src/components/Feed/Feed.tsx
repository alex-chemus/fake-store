import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/redux/store'
import { getProducts } from '@/redux/sagas/actionCreators'
import classes from './Feed.module.scss'
import Card from '../Card/Card'
import Loader from '../Loader/Loader'

const Feed: FC = () => {
  const products = useSelector((state: State) => state.products.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  if (products.length === 0) return (
    <section className={classes.Loading}>
      <Loader />
    </section>
  )

  return (
    <section className={classes.Feed}>
      {products.map((product, i) => {
        return <Card product={product} key={i} />
      })}
    </section>
  )
}

export default Feed