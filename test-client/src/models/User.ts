export interface User {
    id_: string,
    displayName: string,
    guest: boolean,
    email?: string,
    profilePic?: string,
    profileStatus?: string,

    rooms?: string[]    // Collection of room IDs
    friends?: string[]    // Collection of User IDs
}

