export interface Room {
    _id: string,
    type: RoomType,
    name: string,
    pin?: number
}

enum RoomType {
    PublicLan = 'public_lan',
    PrivateLan = 'private_lan',

    DirectMessage = 'direct_message',    // Off-LAN direct message
    Group = 'group'                      // Off-LAN group
}