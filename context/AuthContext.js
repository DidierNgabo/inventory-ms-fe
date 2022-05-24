import axios from "axios";
import React from "react";
import { useApiRequest } from "../hooks/ApiRequest";


const AuthProvider = ({children}) =>{
 
    const [token,setToken] = React.useState(localStorage.getItem("userToken"));
    const [user,setUser] = React.useState(localStorage.getItem('user'));

    const login = async () =>{
        try {
            const response =  await axios.post('http://localhost:4000/auth/login',values);
            if(response){
                localStorage.setItem("userToken",response.data.token);
                setToken(localStorage.getItem('userToken'));
                localStorage.setItem("user",JSON.stringify(res.data.user));
            }
        } catch (error) {
            
        }
    }
    
    const value={
        user,
        error
    }
}


export const AuthContext = React.createContext();
