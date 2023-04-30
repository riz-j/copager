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

    useEffect(() => {

        if (socket && pubLanRoom) {

            socket.emit("on_request_lan_parcel", pubLanRoom);

            socket.emit("on_join_lan_room", pubLanRoom); 
        }

    }, [socket, pubLanRoom])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;