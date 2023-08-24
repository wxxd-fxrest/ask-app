import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Auth from "../screens/auth/Auth";
import Main from "../screens/main/Main";

const AppRouter = () => {
    const {currentUser} = useContext(AuthContext); 

    const ProtectedRoute = ({children}) => {
        if(!currentUser) {
            return <Navigate to="/auth" /> 
        }
        return children ;
    }; 

    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route index element={
                        <ProtectedRoute>
                            <Main />
                        </ProtectedRoute> } />
                        
                    <Route path='/auth' element={<Auth />} />
                    {/* <Route path='/card-page/:docid' element={<CardPage />} />
                    <Route path='/profile/:uid' element={<SharedProfileData />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default AppRouter; 