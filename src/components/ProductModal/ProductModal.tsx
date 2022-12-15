import React, { FC } from 'react'
import type { Product } from '@/redux/reducers/productsReducer'
import classes from './ProductModal.module.scss'

const ProductModal: FC<{
  product: Product,
  close: () => void
}> = ({ product, close }) => {
  return (<>
    <section id="card-modal" className={classes.ProductModal}>
      <div className={classes.ProductContaier}>
        <button id="close-card-modal" className={classes.CloseButton} onClick={close}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <img src={product.image} alt={product.title} />
      
        <div className={classes.Wrapper}>
          <h1 className={classes.Title}>{product.title}</h1>
          <h4 className={classes.Price}>Price - {product.price}$</h4>
        
          <h6 className={classes.DescriptionTitle}>Product description</h6>
          <div className={classes.Separator} />
          <p className={classes.DescriptionText}>{product.description}</p>
        </div>
      </div>
    </section>
    <div className={classes.Backdrop} onClick={close} />
  </>)
}

export default ProductModal