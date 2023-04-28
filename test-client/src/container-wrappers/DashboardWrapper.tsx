import { SocketContext } from "contexts/SocketContext";
import { useIp } from "hooks/useIp";
import { ReactNode, useContext, useEffect, useState } from "react"

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);
    const [ip, setIp] = useState<string>("");

    useIp().then(result => {
        const { query, asname } = result;
        setIp(query);

        console.log(query + asname);
    });

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