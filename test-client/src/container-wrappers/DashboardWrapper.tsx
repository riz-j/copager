import { DataContext } from "contexts/DataContext";
import { SocketContext } from "contexts/SocketContext";
import { usePubLanRoom } from "hooks/usePubLanRoom";
import { ReactNode, useContext, useEffect, useMemo } from "react"

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);
    const currentUserId: string = localStorage.getItem("currentUserId") || "some_user";
    // const messages = useContext(DataContext).messages;
    // usePubLanRoom(); 
    // If successful, LAN Room address will be stored in localStorage. */
    // let pubLanRoom: string | null = localStorage.getItem("pubLanRoom");
    // window.addEventListener("storage", (event) => {
    //     if (event.key === "pubLanRoom") {
    //         pubLanRoom = event.newValue;
    //     }
    // })  /** SUGGESTION: Create a special hook for this */
    const pubLanRoom = useContext(DataContext).pubLanRoomAddr;
    console.log(`FROM DASHBOARD_WRAPPER: ${pubLanRoom}`)

    useEffect(() => {
        if (socket && pubLanRoom && (pubLanRoom !== "")) {
            socket.emit("on_join_lan_room",currentUserId ,pubLanRoom); // SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
        }
    }, [socket, pubLanRoom])
    
    // const messagesDependency = useMemo(() => [messages], [messages]);
    // useEffect(() => {
    //     console.log(`Dashboard wrapper: ${JSON.stringify(messages)}`)

    // }, messagesDependency)

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;