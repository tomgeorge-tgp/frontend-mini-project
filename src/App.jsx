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
import BookingPage from "./pages/Booking";
function App() {
  const [count, setCount] = useState(0)
  // const redirectToDashboard = () => {
  //   const userRole = localStorage.getItem('userRole'); // Assuming userRole is stored in localStorage
  //   if (userRole === ROLES.User) {
  //     navigate('/dashboard/user');
  //   } else if (userRole === ROLES.Counsilor) {
  //     navigate('/dashboard/counsilor');
  //   } else if (userRole === ROLES.Admin) {
  //     navigate('/dashboard/admin');
  //   }
  // };



  const ROLES = {
    'User': "Student",
    'Counsilor': "Counsilor",
    'Admin': "Core"
  }
  return (<>
  {/* <Navbar/> */}
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/dashboard" element={<AdminDashboard/>}/> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts" element={<PostPage />} />
      <Route path="/counsiling" element={<BookingPage/>} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="/logout" element={<Login />} />
      {/* we want to protect these routes */}
      <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
        <Route path="/dashboard/user" element={<UserDashboard/>} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard/>} />
      </Route>


      <Route element={<RequireAuth allowedRoles={[ROLES.Counsilor]}  />}>
        <Route path="/dashboard/counsilor" element={<CounsilorDashboard />} />
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
