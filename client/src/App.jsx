import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'

const App = () => {

  const {showRecruiterLogin} = React.useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
      </Routes>
    </div>
  )
}

export default App