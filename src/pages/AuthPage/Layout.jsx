import { Outlet } from "react-router-dom"
import Navbar from "../../component/NavBar"
const Layout = () => {
    return (
        <main className="App">
            <Navbar/>
            <Outlet />
        </main>
    )
}

export default Layout
