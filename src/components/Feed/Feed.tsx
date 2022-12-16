import React, { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/redux/store'
import { getProducts } from '@/redux/sagas/actionCreators'
import classes from './Feed.module.scss'
import Card from '../Card/Card'
import Loader from '../Loader/Loader'

const Feed: FC = () => {
  const products = useSelector((state: State) => state.products.products)
  const dispatch = useDispatch()

  const observable = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    dispatch(getProducts())

    if (!observable.current) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('intersects')
        dispatch(getProducts())
      }
    }, {
      root: null,
      rootMargin: '50px',
    })
    observer.observe(observable.current)
  }, [])

  if (products.length === 0) return (
    <section className={classes.Loading}>
      <Loader />
    </section>
  )

  return (<>
    <section className={classes.Feed}>
      {products.map((product, i) => {
        return <Card product={product} key={i} />
      })}
    </section>
    <div ref={observable} />
  </>)
}

export default Feed