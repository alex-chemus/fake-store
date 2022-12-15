import React, { FC, useState, useEffect } from 'react'
import classes from './Filters.module.scss'
import Popup from '../Popup/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '@/redux/store'
import { updateFilters } from '@/redux/sagas/actionCreators'

const Filters: FC = () => {
  const appliedFilter = useSelector((state: State) => state.filters.appliedFilter)
  const allFilters = useSelector((state: State) => state.filters.allFilters)
  const dispatch = useDispatch()

  const [showPopup, setShowPopup] = useState(false)
  const [search, setSearch] = useState('')
  const [searchFilters, setSearchFilters] = useState<string[]>([])

  useEffect(() => {
    setSearchFilters(allFilters.filter(filter => {
      return new RegExp(search.trim().toLocaleLowerCase())
        .test(filter.toLocaleLowerCase())
    }))
  }, [search, allFilters])

  const resetFilter = () => {
    dispatch(updateFilters(null))
    setSearch('')
  }

  const enterFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    if (searchFilters.length === 1)
      dispatch(updateFilters(searchFilters[0]))
  }

  if (appliedFilter) return (
    <div className={classes.FiltersSection}>
      <div className={classes.Badge}>{appliedFilter}</div>
    
      <button onClick={resetFilter} className={classes.ResetButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  )

  return (
    <div className={classes.FiltersSection}>
      <input
        type="text" className={classes.Input}
        onFocus={() => setShowPopup(true)}
        onKeyUp={enterFilter}
        onInput={e => setSearch((e.target as HTMLInputElement).value)}
        placeholder="Enter category"
      />

      {
        showPopup
          ? <Popup
            searchFilters={searchFilters}
            close={() => setShowPopup(false)}
          />
          : null
      }
    </div>
  )
}

export default Filters