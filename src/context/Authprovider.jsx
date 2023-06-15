import { createContext, useState,useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const savedAuth = JSON.parse(localStorage.getItem('auth'));
        console.log("saved auth",savedAuth);
        if (savedAuth !== null) {
            setAuth(savedAuth);
            setLoading(false);
        }
        else{

            setLoading(false);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {isLoading
            ? <p>Loading</p>
            :children}
        </AuthContext.Provider>
    )
}

export default AuthContext;