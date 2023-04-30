import { RoomVM } from "models/viewModels/RoomVM";
import { UserVM } from "models/viewModels/UserVM";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { usePubLanRoom } from "hooks/usePubLanRoom";
import { SocketContext } from "./SocketContext";
import { Message } from "models/Message";
import { IUser } from "models/interfaces/IUser";
import { Guest } from "models/Guest";

interface DataStore {
    currentUser: IUser
    rooms: RoomVM[]
    users: UserVM[]
    messages: Message[] // Change to MessageDTO in the future. Maybe? Because we want to set the message to "delivered" accordingly.
    pubLanRoomAddr: string
}

interface DataContextProps {
    children: ReactNode
}

export const DataContext = createContext<DataStore>({} as DataStore);

export const DataProvider = ({ children }: DataContextProps) => {
    // console.log(`HERE IT IS: ${pubLanRoom}`);
    const __currentUser: string = "1j4nj-1n3j1n4k-3knjn2" 
    const [data, setData] = useState<DataStore>({
        currentUser: {} as IUser, 
        rooms: [], 
        users: [], 
        messages: [], 
        pubLanRoomAddr: ""
    })
    const socket = useContext(SocketContext);
    const { pubLanRoom } = usePubLanRoom(); 
    

    useEffect(() => {
        if (socket && pubLanRoom) {
            socket.emit("on_request_lan_parcel", __currentUser, pubLanRoom)
            socket.on("onParcel", (dataParcel: IUser) => {
                setData(prevData => {
                    const newCurrentUser = dataParcel
                    return { ...prevData, currentUser: newCurrentUser }
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
            setData(prevData => { return {...prevData, pubLanRoomAddr: pubLanRoom}})
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