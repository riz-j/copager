import { useSocket } from "hooks/useSocket";

export default function ChatBox() {
    const socket = useSocket();
    
    const handleClick = () => {
        if (socket) {
            socket.emit("onMessage", "Hello Rizki!")
        }
    }

    return (
        <>
            <div>Hello World!</div>
            <button onClick={handleClick}>Click me</button>
        </>
    )
}