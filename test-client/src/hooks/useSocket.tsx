import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { usePubLanRoom } from "./usePubLanRoom";

export const useSocket = () => {
    const URL: string = import.meta.env.VITE_WS_URI || 'http://0.0.0.0:8080';
    const [socket, setSocket] = useState<Socket | null>(null);
    
    /** Get the LAN room address of the client */
    const { pubLanRoom } = usePubLanRoom();

    /** Get the Current User ID. */
    let currentUserId: string | null = localStorage.getItem("currentUserId");

    /** If the Current User ID does not exist, generate a new UUID  */
    if (!currentUserId) {
        currentUserId = uuidv4();
        localStorage.setItem("currentUserId", currentUserId);
    }

    useEffect(() => {
        if (pubLanRoom && currentUserId) {
            const socketInstance = io(URL, {
                query: {
                    USER_ID: currentUserId,
                    LAN_ROOM: pubLanRoom
                }
            });
            setSocket(socketInstance);

            socketInstance.on('connect', () => {
                console.log(`Client connected to ${URL}`)
            })
        

            return () => {
                socketInstance.disconnect();
            }
        }
    }, [pubLanRoom, currentUserId]);

    return socket;
}