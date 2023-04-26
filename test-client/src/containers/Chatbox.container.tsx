import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client"

export default function ChatBox() {
    const URL = 'http://0.0.0.0:8088';
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const socketInstance = io(URL);
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Client connected!")
        })

        return () => {
            socketInstance.disconnect();
        };
    }, [])

    const handleClick = () => {
        if (socket) {
            socket.emit("onMessage", "Hello Rizki!")
        } else {
            console.log("Socket is not connected")
        }
    }

    return (
        <>
            <div>Hello World!</div>
            <button onClick={handleClick}>Click me</button>
        </>
    )
}