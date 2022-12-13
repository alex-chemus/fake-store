import React, { FC, useState } from 'react'
import classes from './Filters.module.scss'
import Popup from '../Popup/Popup'
import { useSelector } from 'react-redux'
import { State } from '@/redux/store'

const Filters: FC = () => {
  // applied filters
  const appliedFilter = useSelector((state: State) => state.filters.appliedFilter)

  const [showPopup, setShowPopup] = useState(true)
  const [search, setSearch] = useState('')

  return (
    <div className={classes.FiltersSection}>
      <div>{appliedFilter}</div>

      <input
        type="text"
        onInput={e => setSearch((e.target as HTMLInputElement).value)}
      />

      {
        showPopup
          ? <Popup search={search} />
          : null
      }
    </div>
  )
}

export default Filters