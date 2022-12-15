import React, { FC, useState } from "react"
import classes from './MainView.module.scss'
import Filters from "../Filters/Filters"
import Feed from "../Feed/Feed"
import EditorModal from "../EditorModal/EditorModal"
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher"
import FormButton from "../FromButton/FormButton"

const MainView: FC = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className={classes.MainContainer}>
      <section className={classes.FiltersSection}>
        <Filters />
      </section>

      <section className={classes.FeedSection}>
        <Feed />
      </section>

      {
        showForm
          ? <EditorModal close={() => setShowForm(false)} />
          : null
      }

      <FormButton onClick={() => setShowForm(true)} />
      <ThemeSwitcher />
    </main>
  )
}

export default MainView