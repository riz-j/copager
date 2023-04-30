import { RoomDTO } from "models/DTO/RoomDTO";
import { UserDTO } from "models/DTO/UserDTO";
import { Message } from "models/Message";
import { User } from "models/User";
import { ReactNode, createContext } from "react";

interface DataContext {
    currentUser: User
    rooms: RoomDTO[]
    users: UserDTO[]
    messages: Message[]
}

interface DataContextProps {
    children: ReactNode
}
// After done testing, remove "string" from below
export const DataContext = createContext<DataContext | null | string>(null);

export const DataProvider = ({ children }: DataContextProps) => {
    const __test: string = "Hello! OMG DataContext is Workin!"

    return (
        <DataContext.Provider value={__test}>
            {children}
        </DataContext.Provider>
    )
}