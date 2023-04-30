import { RoomVM } from "models/viewModels/RoomVM";
import { UserVM } from "models/viewModels/UserVM";
import { User } from "models/User";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import { MessageVM } from "models/viewModels/MessageVM";
import { Message } from "models/Message";
import { IUser } from "models/interfaces/IUser";
import { Guest } from "models/Guest";

interface DataStore {
    currentUser: IUser
    rooms: RoomVM[]
    users: UserVM[]
    messages: Message[] // Change to MessageDTO in the future. Maybe? Because we want to set the message to "delivered" accordingly.
}

interface DataContextProps {
    children: ReactNode
}

export const DataContext = createContext<DataStore>({} as DataStore);

export const DataProvider = ({ children }: DataContextProps) => {
    const __currentUser: Guest = {_id: "1j4nj-1n3j1n4k-3knjn2", displayName: "Joey"} 
    const [data, setData] = useState<DataStore>({currentUser: __currentUser, rooms: [], users: [], messages: []})
    const socket = useContext(SocketContext);

    useEffect(() => {
        if (socket) {
            socket.on("onParcel", (dataParcel: DataStore) => {
                setData(dataParcel);
            })
    
            socket.on("onMessage", (message: Message) => {
                setData(prevData => {
                    const updatedMessages = [...prevData.messages, message] 
                    return { ...prevData, messages: updatedMessages }
                })
            })
        }

        return () => {
            if (socket) {
                socket.off("onParcel")
                socket.off("onMessage")
            }
        }
    }, [socket])

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}