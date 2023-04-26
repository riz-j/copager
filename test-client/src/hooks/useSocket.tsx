import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

export const useSocket = () => {
    const URL = 'http://0.0.0.0:8088';
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io(URL);
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log(`Client connected to ${URL}`)
        })

        return () => {
            socketInstance.disconnect();
        }
    }, []);

    return socket;
}