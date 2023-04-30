import { RoomVM } from "models/viewModels/RoomVM";
import { UserVM } from "models/viewModels/UserVM";
import { Message } from "models/Message";
import { User } from "models/User";
import { ReactNode, createContext, useContext, useState } from "react";
import { SocketContext } from "./SocketContext";

interface DataStore {
    currentUser: User
    rooms: RoomVM[]
    users: UserVM[]
    messages: Message[]
}

interface DataContextProps {
    children: ReactNode
}

export const DataContext = createContext<DataStore | null>(null);

export const DataProvider = ({ children }: DataContextProps) => {
    const [data, setData] = useState<DataStore | null>(null)
    const socket = useContext(SocketContext);

    if (socket) {
        socket.on("onParcel", (dataParcel: DataStore) => {
            setData(dataParcel);
        })
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}