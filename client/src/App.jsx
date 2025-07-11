import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import ManageJobs from './pages/ManageJobs'
import AddJobs from './pages/AddJobs'
import ViewApplications from './pages/VeiwApplications'
import 'quill/dist/quill.snow.css'
 import { ToastContainer } from 'react-toastify';

const App = () => {

  const {showRecruiterLogin, companyToken} = React.useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/dashboard' element={<Dashboard />}>
        {companyToken ? <>
          <Route path='manage-jobs' element={<ManageJobs />} />
          <Route path='add-jobs' element={<AddJobs />} />
          <Route path='view-applications' element={<ViewApplications />} />
        </> : null
    }
        </Route>
      </Routes>
    </div>
  )
}

export default App