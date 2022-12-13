import React, { FC } from "react"
import classes from './MainView.module.scss'
import Filters from "../Filters/Filters"
import Feed from "../Feed/Feed"

const MainView: FC = () => {
  return (
    <main className={classes.MainContainer}>
      <section className={classes.FiltersSection}>
        <Filters />
      </section>

      <section className={classes.FeedSection}>
        <Feed />
      </section>
    </main>
  )
}

export default MainView