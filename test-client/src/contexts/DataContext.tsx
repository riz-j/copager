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
}

interface DataContextProps {
    children: ReactNode
}

export const DataContext = createContext<DataStore>({} as DataStore);

export const DataProvider = ({ children }: DataContextProps) => {
    /* If successful, LAN Room address will be stored in localStorage. */
    // let pubLanRoom: string | null = localStorage.getItem("pubLanRoom");
    // window.addEventListener("storage", (event) => {
        //     if (event.key === "pubLanRoom") {
            //         pubLanRoom = event.newValue;
            //     }
            // })  /** SUGGESTION: Create a special hook for this */
            // const [pubLanRoom, setPubLanRoom] = useState<string | null>();
    const { pubLanRoom, mobile, proxy } = usePubLanRoom(); 
    console.log(`HERE IT IS: ${pubLanRoom}`);
    const __currentUser: string = "1j4nj-1n3j1n4k-3knjn2" 
    const [data, setData] = useState<DataStore>({currentUser: {} as IUser, rooms: [], users: [], messages: []})
    // const [currentUser, setCurrentUser] = useState<IUser>({} as IUser)
    //const { pubLanRoom } = usePubLanRoom();
    const socket = useContext(SocketContext);

    // const handlePubLanRoom = async () => {
    //     setPubLanRoom(pubLanRoom);
    // }
    

    useEffect(() => {
        // handlePubLanRoom()
        // (async () => {
        //     const { pubLanRoom, mobile, proxy } = await usePubLanRoom();
        //     console.log(`HERE IT IS: ${pubLanRoom}`);
        //     setPubLanRoom(pubLanRoom);
        // })();
        if (socket && pubLanRoom) {
            console.log("SHAWTY IS A MELODY")
            socket.emit("on_request_lan_parcel", __currentUser, pubLanRoom)
            socket.on("onParcel", (dataParcel: IUser) => {
                setData(prevData => {
                    const newCurrentUser = dataParcel
                    return { ...prevData, currentUser: newCurrentUser }
                })
                //setCurrentUser(dataParcel);
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
    }, [socket, pubLanRoom])

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}