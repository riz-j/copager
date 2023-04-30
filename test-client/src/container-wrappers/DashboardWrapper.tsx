import { DataContext } from "contexts/DataContext";
import { SocketContext } from "contexts/SocketContext";
import { ReactNode, useContext, useEffect } from "react"

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);
    const currentUserId: string = localStorage.getItem("currentUserId") || "some_user";
    const pubLanRoom = useContext(DataContext).pubLanRoomAddr;

    useEffect(() => {
        if (socket && pubLanRoom && (pubLanRoom !== "")) {
            socket.emit("on_join_lan_room", currentUserId, pubLanRoom); // SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
        }
    }, [socket, pubLanRoom])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;