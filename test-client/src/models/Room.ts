export interface Room {
    id_: string,
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