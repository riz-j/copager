import { createContext, ReactNode } from "react";
import { useSocket } from "hooks/useSocket";
import { Socket } from "socket.io-client";

interface SocketContextProps {
    children: ReactNode;
}

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: SocketContextProps) => {
    const socket = useSocket();

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};