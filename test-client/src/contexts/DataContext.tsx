import { User } from "models/User";
import { createContext } from "react";

interface DataContext {
    currentUser: User
}

// export const DataContext = createContext<