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

  const add = async () => {
    addProduct({
      name, price, description, image, filter
    })
  }

  return (<>
    <form
      className={classes.EditorModal}
      onSubmit={e => e.preventDefault()}
    >
      <div className={classes.FormContainer}>
      <button onClick={close} className={classes.CloseButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <label className={classes.Field}>
        <span>Title</span>
        <input
          type="text" className={classes.TextInput} placeholder="Title"
          onInput={e => setName((e.target as HTMLInputElement).value)} 
        />
      </label>

      <label className={classes.Field}>
        <span>Price</span>
        <input 
          type="text" className={[classes.TextInput, classes.Short].join(' ')} placeholder="Price"
          onInput={e => setPrice((e.target as HTMLInputElement).value)} 
        />
      </label>

      <label className={classes.Field}>
        <span>Description</span>
        <textarea
          className={classes.TextInput} rows={3} placeholder="Description"
          onInput={e => setDescription((e.target as HTMLInputElement).value)} 
        ></textarea>
      </label>

      <label className={classes.Field}>
        <span>Image</span>
        <input
          type="text" className={classes.TextInput} placeholder="URL"
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

      <button onClick={add} className={classes.AddButton}>Add new product</button>
      </div>
    </form>
    <div className={classes.Backdrop} onClick={close} />
  </>)
}

export default EditorModal