import React, { FC } from "react"
import classes from './MainView.module.scss'
import Filters from "../Filters/Filters"
import Feed from "../Feed/Feed"
import EditorModal from "../EditorModal/EditorModal"
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher"

const MainView: FC = () => {
  return (
    <main className={classes.MainContainer}>
      <section className={classes.FiltersSection}>
        <Filters />
      </section>

      <section className={classes.FeedSection}>
        <Feed />
      </section>

      <ThemeSwitcher />
    </main>
  )
}

export default MainView