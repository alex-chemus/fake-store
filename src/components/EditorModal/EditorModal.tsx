import React, { FC, useState } from 'react'
import classes from './EditorModal.module.scss'
import { useSelector } from 'react-redux'
import { State } from '@/redux/store'
import { addProduct } from '@/api'

const EditorModal: FC = () => {
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

  return (
    <form
      className={classes.EditorModal}
      onSubmit={e => e.preventDefault()}
    >
      <label>
        <span>Title</span>
        <input type="text" onInput={e => setName((e.target as HTMLInputElement).value)} />
      </label>

      <label>
        <span>Price</span>
        <input type="text" onInput={e => setPrice((e.target as HTMLInputElement).value)} />
      </label>

      <label>
        <span>Description</span>
        <textarea onInput={e => setDescription((e.target as HTMLInputElement).value)} />
      </label>

      <label>
        <span>Image</span>
        <input type="text" onInput={e => setImage((e.target as HTMLInputElement).value)} />
      </label>

      <fieldset>
        {allFilters.map((f, i) => {
          return (
            <label key={i}>
              <input 
                type="radio" name="radiobutton" value={f}
                onChange={e => setFilter(f)}
              />
              <span>{f}</span>
            </label>
          )
        })}
      </fieldset>

      <button onClick={add}>Add new product</button>
    </form>
  )
}

export default EditorModal