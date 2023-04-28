import { SocketContext } from "contexts/SocketContext";
import { ReactNode, useContext, useEffect } from "react"

interface DashboardWrapperProps {
    children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        const fetch_ip_api = async () => {
            try {
                const response = await fetch("http://ip-api.com/json/?fields=status,message,countryCode,zip,asname,query");
                const result = await response.json();
                console.log(result.query);
            } catch (error) {
                console.error("Error IP API Data: ", error);
            }
        }
        
        fetch_ip_api();
        socket?.emit("on_join_lan_room", "202.86.119.241"); // SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
        
    }, [socket])

    return (
        <>
            {children}
        </>
    )
}

export default DashboardWrapper;