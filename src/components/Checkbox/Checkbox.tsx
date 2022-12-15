import React, { FC, ReactNode } from 'react'
import classes from './Checkbox.module.scss'

const Checkbox: FC<{
  checked: boolean,
  check: () => void,
  children: ReactNode
}> = ({ checked, check, children }) => {
  return (
    <button onClick={check} className={classes.Checkbox}>
      <div className={classes.Border} />
      {checked ? <div className={classes.Dot} /> : null}
      {children}
    </button>
  )
}

export default Checkbox