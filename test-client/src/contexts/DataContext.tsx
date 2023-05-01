import { RoomVM } from "models/viewModels/RoomVM";
import { UserVM } from "models/viewModels/UserVM";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { usePubLanRoom } from "hooks/usePubLanRoom";
import { SocketContext } from "./SocketContext";
import { Message } from "models/Message";
import { IUser } from "models/interfaces/IUser";

interface DataStore {
    currentUser: IUser
    rooms: RoomVM[]
    users: UserVM[]
    messages: Message[] // Change to MessageDTO in the future. Maybe? Because we want to set the message to "delivered" accordingly.
    pubLanRoomAddr: string | undefined
}

interface DataContextProps {
    children: ReactNode
}

export const DataContext = createContext<DataStore>({} as DataStore);

export const DataProvider = ({ children }: DataContextProps) => {
    const socket = useContext(SocketContext);
    const { pubLanRoom } = usePubLanRoom(); 
    
    const [data, setData] = useState<DataStore>({
        currentUser: {} as IUser, 
        rooms: [], 
        users: [], 
        messages: [], 
        pubLanRoomAddr: undefined
    })
    

    useEffect(() => {
        if (socket && pubLanRoom) {
                        
            socket.on("onParcel", (dataParcel: DataStore) => {
                setData(prevData => {
                    const loadedCurrentUser = dataParcel.currentUser;
                    const loadedUsers = dataParcel.users;
                    const loadedMessages = dataParcel.messages;
                    return { ...prevData, 
                        currentUser: loadedCurrentUser, 
                        users: [...prevData.users, ...loadedUsers], 
                        messages: [...prevData.messages, ...loadedMessages]
                    }
                })
            })
    
            socket.on("onMessage", (message: Message) => {
                setData(prevData => {
                    const updatedMessages = [...prevData.messages, message] 
                    return { ...prevData, messages: updatedMessages }
                })
            })
        }

        if (pubLanRoom) {
            setData(prevData => { 
                return {...prevData, pubLanRoomAddr: pubLanRoom}
            })
        }

        return () => {
            if (socket) {
                socket.off("onParcel")
                socket.off("onMessage")
            }
        }
    }, [socket, pubLanRoom])

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}