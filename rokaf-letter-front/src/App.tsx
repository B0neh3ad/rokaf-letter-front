import './App.css'
import {RouterProvider} from 'react-router-dom';
import Router from './pages/Router'

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
