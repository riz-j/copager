import { SocketContext } from "contexts/SocketContext";
import { ReactNode, useContext, useEffect } from "react"

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);
    //const ip_api_res

    useEffect(() => {
        
        socket?.emit("on_join_lan_room", "some_room"); // SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
        
    }, [socket])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;