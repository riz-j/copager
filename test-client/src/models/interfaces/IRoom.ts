export interface IRoom {
    _id: string
    type: RoomType
}

export enum RoomType {
    PublicLan = 'PUBLIC_LAN',
    PrivateLan = 'PRIVATE_LAN',
    DirectMessage = 'DIRECT_MESSAGE',    // Off-LAN direct message
    Group = 'GROUP'                      // Off-LAN group
}