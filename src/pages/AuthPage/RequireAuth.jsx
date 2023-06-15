import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
   console.log("auth", auth?.roles);
   console.log("allowedRoles",allowedRoles);
    return (
        auth?.user
        ? (
            auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
        )
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
        //  Array.isArray(auth?.roles) && auth.roles.some(role => allowedRoles.includes(role))