import React, { FC } from 'react'
import { Product } from '@/redux/reducers/productsReducer'
import classes from './Card.module.scss'

const Card: FC<{ product: Product }> = ({ product }) => {
  return (
    <article className={classes.Card}>
      <img src={product.image} alt={product.title} />
      <div className={classes.Wrapper}>
        <h6 title={product.title}>{product.title}</h6>
        <small>{product.price}$</small>
      </div>
    </article>
  )
}

export default Card