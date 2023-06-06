import { useState } from 'react'
import './App.css'
import Navbar from './component/NavBar';
import Register from './pages/Register'
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import CounsilorDashboard from './pages/CounsilorDashboard';
import UserDashboard from './pages/UserDashoard';
import Unauthorized from './pages/AuthPage/Unauthorized';
import RequireAuth from './pages/AuthPage/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/AuthPage/Layout';
import Missing from './pages/Missing';
import PostPage from './pages/PostPage';
import PostPageNew from './pages/PostPageNew';
function App() {
  const [count, setCount] = useState(0)
  const ROLES = {
    'User': 2001,
    'Counsilor': 1984,
    'Admin': 5150
  }
  return (<>
  {/* <Navbar/> */}
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route path="/dashboard" element={<AdminDashboard/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts" element={<PostPage />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="/logout" element={<Login />} />
      {/* we want to protect these routes */}
      <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
        <Route path="/user/dashboard" element={<UserDashboard/>} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/admin/dashboard/:id" element={<AdminDashboard/>} />
      </Route>


      <Route element={<RequireAuth allowedRoles={[ROLES.Counsilor]} />}>
        <Route path="/counsilor/dashboard/:id" element={<CounsilorDashboard />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
        {/* <Route path="lounge" element={<Home />} /> */}
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
  </>
  )
}

export default App
