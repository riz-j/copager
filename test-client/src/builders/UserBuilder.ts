import { User } from "models/User";
import { v4 as uuidv4 } from "uuid";

export class UserBuilder {
    private user: User;

    constructor() {
        this.user = {} as User;
        this.user.id_ = uuidv4();
        this.user.guest = true;
    }

    setDisplayName(displayName: string): UserBuilder {
        this.user.displayName = displayName;
        return this;
    }

    setGuest(guest: boolean): UserBuilder {
        this.user.guest = guest;
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
            throw new Error("Display Name must be set before building the User object");
        }

        if (this.user.guest === false) {
            if (!this.user.email) {
                throw new Error("If User is not a guest, an email must be set before building the User object");
            }
        }

        if (!this.user.guest) {
            if (!this.user.rooms) {
                this.user.rooms = [];
            }
            if (!this.user.friends) {
                this.user.friends = [];
            }
        }

        return this.user;
    }
}