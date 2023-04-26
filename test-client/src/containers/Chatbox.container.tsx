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
            <div>
                <input 
                    className="border-2 border-slate-500 rounded p-2"
                />
                <button onClick={handleClick}>Click me</button>
            </div>
        </>
    )
}