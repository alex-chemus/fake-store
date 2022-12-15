import React, { FC } from 'react'
import classes from './Loader.module.scss'


const Loader: FC = () => {
  return (<div className={classes.Spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
}

export default Loader