import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const Room = () =>{
    const {userRooms,isUserRoomsLoading,userRoomsError} = useContext(RoomContext)
    
    console.log("Userrooms",userRooms)
    
    return (<>Room</>);
}

export default Room;