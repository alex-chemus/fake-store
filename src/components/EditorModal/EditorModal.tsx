import React, { FC, useState } from 'react'
import classes from './EditorModal.module.scss'
import { useSelector } from 'react-redux'
import { State } from '@/redux/store'
import { addProduct } from '@/api'
import Checkbox from '../Checkbox/Checkbox'

const EditorModal: FC<{ close: () => void }> = ({ close }) => {
  const allFilters = useSelector((state: State) => state.filters.allFilters)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [filter, setFilter] = useState('')

  const validatePrice = () => {
    let chunks = price.split('.')

    const singleValue = chunks.length === 1 && !isNaN(+chunks[0])
    let doubleValue = chunks.length === 2 && !isNaN(+chunks[0]) && !isNaN(+chunks[1])

    if (singleValue && chunks[0] !== '') {
      alert(chunks[0])
      setPrice(prev => `${prev}.00`)
      return
    }

    if (chunks.length > 2) {
      setPrice(`${chunks[0]}.${chunks[1]}`)
      return
    }

    if (price.startsWith('.')) {
      setPrice(prev => `0${prev}`)
      chunks[0] = '0'
    }

    if (price.endsWith('.')) {
      setPrice(prev => `${prev}00`)
      chunks[1] = '00'
    }

    if (doubleValue && chunks[1].length === 1) {
      setPrice(prev => `${prev}0`)
      return
    }

    if (doubleValue && chunks[1].length === 2) return

    if (doubleValue && chunks[1].length > 2) { 
      setPrice(`${chunks[0]}.${chunks[1].slice(0, 2)}`)
      return
    }

    setPrice('0.00')
  }

  const add = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (name === '' || price === '' || description === '' || image === '' || filter === '') return
    addProduct({
      name, price, description, image, filter
    })
    alert('The product has been added')
    close()
  }

  return (<>
    <div
      id="editor-modal"
      className={classes.EditorModal}
    >
      <button
        onClick={close}
        className={classes.CloseButton}
        id="close-editor-modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <form onSubmit={e => e.preventDefault()} className={classes.FormContainer}>
        <label className={classes.Field}>
          <span>Title</span>
          <input
            type="text" className={classes.TextInput} placeholder="Title" name='title'
            onInput={e => setName((e.target as HTMLInputElement).value)} 
          />
        </label>

        <label className={classes.Field}>
          <span>Price, $</span>
          <input 
            type="text" className={[classes.TextInput, classes.Short].join(' ')} placeholder="Price" name="price"
            onInput={e => setPrice((e.target as HTMLInputElement).value)} value={price}
            onBlur={validatePrice}
          />
        </label>

        <label className={classes.Field}>
          <span>Description</span>
          <textarea
            className={classes.TextInput} rows={3} placeholder="Description" name="description"
            onInput={e => setDescription((e.target as HTMLInputElement).value)} 
          ></textarea>
        </label>

        <label className={classes.Field}>
          <span>Image</span>
          <input
            type="text" className={classes.TextInput} placeholder="URL" name="image"
            onInput={e => setImage((e.target as HTMLInputElement).value)}
          />
        </label>

        <fieldset className={classes.RadioButtons}>
          <p>Category</p>
          <div className={classes.CheckboxWrapper}>{allFilters.map((f, i) => {
            return (
              <Checkbox
                check={() => setFilter(f)}
                checked={f === filter}
                key={i}
              >{f}</Checkbox>
            )
          })}</div>
        </fieldset>

        <button
          onSubmit={e => e.preventDefault()}
          onClick={add} id="add-button"
          className={classes.AddButton}
        >Add new product</button>
      </form>
    </div>
    <div className={classes.Backdrop} onClick={close} />
  </>)
}

export default EditorModal