import { useState } from 'react'

import './App.css'
import Header from './component/Header.jsx'
import Crud from './component/CRUD.jsx'

const App = () => {
  return (

    <div>
      <Header/>
      <Crud/>
    </div>
  )
}

export default App
