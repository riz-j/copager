interface User {
    _id: string,
    displayName: string,
    guest: boolean,
    email?: string | null,
    profilePic?: string | null,
    profileStatus?: string | null,

    rooms?: string[]    // Collection of room IDs
    friends?: string[]    // Collection of User IDs
}