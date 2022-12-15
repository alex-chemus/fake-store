import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getAllFilters } from '@/redux/sagas/actionCreators';
import MainView from '@/components/MainView/MainView';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllFilters())
  }, [])

  return <MainView />
}

export default App;
