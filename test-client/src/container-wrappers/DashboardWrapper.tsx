import { SocketContext } from "contexts/SocketContext";
import { useLanRoom } from "hooks/useLanRoom";
import { ReactNode, useContext, useEffect } from "react"

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);
    
    useLanRoom(); 
    /* If successful, LAN Room address will be stored in localStorage. */
    
    const lanRoomAddr: string | null = localStorage.getItem("lanRoomAddr");
    
    useEffect(() => {
        if (socket && lanRoomAddr && (lanRoomAddr !== "")) {
            socket.emit("on_join_lan_room", lanRoomAddr); // SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
        }
    }, [socket, lanRoomAddr])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;