import { SocketContext } from "contexts/SocketContext";
import { useLanRoom } from "hooks/useLanRoom";
import { ReactNode, useContext, useEffect, useState } from "react"

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);
    const [ip, setIp] = useState<string>("");
    
    useLanRoom(); 
    /* If successful, LAN Room address will be stored in localStorage. */

    useEffect(() => {
        if (socket && ip) {
            socket.emit("on_join_lan_room", ip); // SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
        }
    }, [socket, ip])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;