import { RoomDTO } from "models/DTO/RoomDTO";
import { UserDTO } from "models/DTO/UserDTO";
import { Message } from "models/Message";
import { User } from "models/User";
import { ReactNode, createContext, useContext, useState } from "react";
import { SocketContext } from "./SocketContext";

// DataParcel or DataStore???
interface DataParcel {
    currentUser: User
    rooms: RoomDTO[]
    users: UserDTO[]
    messages: Message[]
}

interface DataContextProps {
    children: ReactNode
}

export const DataContext = createContext<DataParcel | null>(null);

export const DataProvider = ({ children }: DataContextProps) => {
    const [data, setData] = useState<DataParcel | null>(null)
    const socket = useContext(SocketContext);

    if (socket) {
        socket.on("onParcel", (dataParcel: DataParcel) => {
            setData(dataParcel);
        })
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}