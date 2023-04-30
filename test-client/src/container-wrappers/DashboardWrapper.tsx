import { DataContext } from "contexts/DataContext";
import { SocketContext } from "contexts/SocketContext";
import { ReactNode, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);
    const pubLanRoom = useContext(DataContext).pubLanRoomAddr;

    /** Get the Current User ID. */
    let currentUserId: string | null = localStorage.getItem("currentUserId");

    /** If the Current User ID does not exist, generate a new UUID  */
    if (!currentUserId) {
        currentUserId = uuidv4();
        localStorage.setItem("currentUserId", currentUserId);
    }

    useEffect(() => {

        if (socket && pubLanRoom && currentUserId) {

            socket.emit("on_request_lan_parcel", currentUserId, pubLanRoom);

            socket.emit("on_join_lan_room", currentUserId, pubLanRoom); 
        }

    }, [socket, pubLanRoom])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;