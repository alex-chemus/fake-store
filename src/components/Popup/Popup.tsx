import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { updateFilters } from '@/redux/sagas/actionCreators'
import classes from './Popup.module.scss'

const Popup: FC<{
  searchFilters: string[]
  close: () => void
}> = ({ searchFilters, close }) => {
  const dispatch = useDispatch()

  const clickHandler = (s: string) => {
    dispatch(updateFilters(s))
  }

  if (searchFilters.length === 0) return null

  return (<>
    <ul className={classes.Popup}>{
      searchFilters.map((filter, i) => {
        return (
          <li key={i}>
            <button onClick={() => clickHandler(filter)}>
              {filter}
            </button>
          </li>
        )
      })
    }</ul>
    <div className={classes.Backdrop} onClick={close} />
  </>)
}

export default Popup