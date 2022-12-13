import React, { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '@/redux/store'
import { updateFilters } from '@/redux/sagas/actionCreators'

const Popup: FC<{
  search: string,
}> = ({ search }) => {
  const dispatch = useDispatch()

  const allFilters = useSelector((state: State) => state.filters.allFilters)
  const [searchFilters, setSearchFilters] = useState<string[]>([])

  useEffect(() => {
    setSearchFilters(allFilters.filter(filter => {
      return new RegExp(search.trim()).test(filter.toLocaleLowerCase())
    }))
  }, [search, allFilters])

  const clickHandler = (s: string) => {
    alert('click')
    dispatch(updateFilters({
      remove: false,
      filters: [s]
    }))
  }

  return (<>
    <ul>{
      searchFilters.map((filter, i) => {
        return (
          <li key={i} onClick={() => clickHandler(filter)}>{filter}</li>
        )
      })
    }</ul>
  </>)
}

export default Popup