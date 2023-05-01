import { SocketContext } from "contexts/SocketContext";
import { ReactNode, useContext, useEffect } from "react";

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        if (socket) {

            socket.emit("on_request_lan_parcel");

            socket.emit("on_join_lan_room"); 
        }
    }, [socket])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;