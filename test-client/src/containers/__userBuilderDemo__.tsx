import { GuestBuilder } from "builders/GuestBuilder";
import { UserBuilder } from "builders/UserBuilder";
import { Guest } from "models/Guest";
import { User } from "models/User";

const __userBuilderDemo__: React.FC = () => {

    const handleBuildUser = () => {
        const user: User = new UserBuilder()
            .setDisplayName("Ricky Gervais")
            .setEmail("rickyg@gmail.com")
            .build();

        console.log(user);
    }

    const handleBuildGuest = () => {
        const guest: Guest = new GuestBuilder()
            .setDisplayName("Flying Hippo")
            .build();
        
        console.log(guest);
    }

    const buttonStyle: string = "border-2 border-slate-500";

    return (
        <>
            <div className="flex">
                <button onClick={handleBuildUser} className={buttonStyle}>Build User!</button>
                <button onClick={handleBuildGuest} className={buttonStyle}>Build Guest!</button>
            </div>
        </>
    )
}

export default __userBuilderDemo__;