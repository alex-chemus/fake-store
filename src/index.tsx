import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './style.scss'

const prefers = (theme: 'light' | 'dark') =>
  window.matchMedia(`(prefers-color-scheme: ${theme})`).matches
const rootElem = document.querySelector(':root') as HTMLElement

if (prefers('light'))
  rootElem.setAttribute('data-theme', 'light')
else if (prefers('dark'))
  rootElem.setAttribute('data-theme', 'dark')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
