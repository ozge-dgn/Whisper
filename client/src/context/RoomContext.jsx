import { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const RoomContext = createContext();

export const RoomContextProvider = ({children,user}) =>{
    const [userRooms, setUserRooms] = useState(null);
    const [isUserRoomsLoading, setIsUserRoomsLoading] = useState(false);
    const [userRoomsError, setUserRoomsError] = useState(null);
    
    //Get user rooms everytime user changes
    useEffect(()=>{
        const getUserRooms = async ( )=>{

            //check if logged in user exists
            if(user?._id){
                
                setIsUserRoomsLoading(true);
                setUserRoomsError(null);

                const response = await getRequest(`${baseUrl}/rooms/${user?._id}`)
            
                setIsUserRoomsLoading(false);
                
                //check if get request returns an error set the user room otherwise
                if(response.error){
                    return setUserRoomsError(response);
                }

                setUserRooms(response)
            }
            
            
        }
        getUserRooms()
    },[user]);
    
    return <RoomContext.Provider 
    value={
        {
            userRooms,
            isUserRoomsLoading,
            userRoomsError
        }
    }
        >
            {children}
        </RoomContext.Provider>

}