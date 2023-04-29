import { SocketContext } from "contexts/SocketContext";
import { usePubLanRoom } from "hooks/usePubLanRoom";
import { ReactNode, useContext, useEffect } from "react"

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);
    
    usePubLanRoom(); 
    /* If successful, LAN Room address will be stored in localStorage. */
    
    let pubLanRoom: string | null = localStorage.getItem("pubLanRoom");

    window.addEventListener("storage", (event) => {
        if (event.key === "pubLanRoom") {
            pubLanRoom = event.newValue;
        }
    })  /** SUGGESTION: Create a special hook for this */
    
    useEffect(() => {
        if (socket && pubLanRoom && (pubLanRoom !== "")) {
            socket.emit("on_join_lan_room", pubLanRoom); // SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
        }
    }, [socket, pubLanRoom])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;