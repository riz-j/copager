import { User } from "models/User";
import { v4 as uuidv4 } from "uuid";

export class UserBuilder {
    private user: User;

    constructor() {
        this.user = {} as User;
        this.user._id = uuidv4();

        this.user.profilePic = undefined;
        this.user.profileStatus = undefined;
        
        this.user.rooms = [];
        this.user.friends = [];
    }

    setDisplayName(displayName: string): UserBuilder {
        this.user.displayName = displayName;
        return this;
    }

    setEmail(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    setProfilePic(URL: string): UserBuilder {
        this.user.profilePic = URL;
        return this;
    }

    setProfileStatus(profileStatus: string): UserBuilder {
        this.user.profileStatus = profileStatus;
        return this;
    }

    setRooms(rooms: string[]): UserBuilder {
        this.user.rooms = rooms;
        return this;
    }

    setFriends(friends: string[]): UserBuilder {
        this.user.friends = friends;
        return this;
    }

    build(): User {
        if (!this.user.displayName) { 
            throw new Error("Display Name needs to be set") 
        }

        if (!this.user.email) { 
            throw new Error("Email needs to be set") 
        }

        return this.user;
    }
}