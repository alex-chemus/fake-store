import React, { FC, useState } from 'react'
import { Product } from '@/redux/reducers/productsReducer'
import classes from './Card.module.scss'
import ProductModal from '../ProductModal/ProductModal'

const Card: FC<{ product: Product }> = ({ product }) => {
  const [showModal, setShowModal] = useState(false)

  return (<>
    <article className={classes.Card} onClick={() => setShowModal(true)}>
      <img src={product.image} alt={product.title} />
      <div className={classes.Wrapper}>
        <h6 title={product.title}>{product.title}</h6>
        <small>{product.price}$</small>
      </div>
    </article>

    {
      showModal
        ? <ProductModal
          product={product}
          close={() => setShowModal(false)}
        />
        : null
    }
  </>)
}

export default Card