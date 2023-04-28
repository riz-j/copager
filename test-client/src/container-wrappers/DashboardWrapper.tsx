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
    
    let lanRoomAddr: string | null = localStorage.getItem("lanRoomAddr");

    window.addEventListener("storage", (event) => {
        if (event.key === "lanRoomAddr") {
            lanRoomAddr = event.newValue;
        }
    })  /** SUGGESTION: Create a special hook for this */
    
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