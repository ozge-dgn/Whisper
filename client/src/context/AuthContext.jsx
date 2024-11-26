import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

//User info for easy testing :
//email = a@a.com
//password = 1

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{

    const [user,setUser] = useState(null)
    const [registerError,setRegisterError] = useState()
    const [isRegisterLoading,setIsRegisterLoading] = useState(false)
    const [registerInfo,setRegisterInfo] = useState({
        name:"",
        email:"",
        password:"",
        username:""
    });
    const [loginError,setLoginError] = useState()
    const [isLoginLoading,setIsLoginLoading] = useState(false)
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    });

    //Just for control delete later
    console.log("User",user);
    console.log("Login",loginInfo);

    //User information gets deleted when page refreshes so we take the user information from the local storage if it exists
    useEffect(()=>{
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    },[])
    //Only for control
    console.log("register info ", registerInfo)

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    },[]);

    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info)
    },[]);

    const registerUser = useCallback(async(e)=>{
        e.preventDefault();

        setIsRegisterLoading(true)
        setRegisterError(null)

        const response = await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo))

        setIsRegisterLoading(false)

        if(response.error){

            return setRegisterError(response)
        }

        localStorage.setItem("User",JSON.stringify(response))
        setUser(response);

    },[registerInfo]);

    const loginUser = useCallback(async (e)=>{
        e.preventDefault()

        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo))
        
        setIsLoginLoading(false)

        if(response.error){
            return setLoginError(response)
        }

        localStorage.setItem("User",JSON.stringify(response))
        setUser(response)
        setLoginInfo(null)
    },[loginInfo])

    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User");
        setUser(null);
        },[])

    return <AuthContext.Provider 
            value = 
            {{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginUser,
                loginError,
                loginInfo,
                updateLoginInfo,
                isLoginLoading,
            }}>
        {children}
    </AuthContext.Provider>
}