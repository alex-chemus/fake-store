import React, { FC } from 'react'
import classes from './FormButton.module.scss'

const FormButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className={classes.FormButton} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  )
}

export default FormButton