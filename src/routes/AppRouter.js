import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import AskScreen from "../screens/ask/AskScreen";
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
        <BrowserRouter basename="ask-app">
            <Routes>
                <Route>
                    <Route index element={
                        <ProtectedRoute>
                            <Main />
                        </ProtectedRoute> } />
                        
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/profile/:email' element={<AskScreen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default AppRouter; 