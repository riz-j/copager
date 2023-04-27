import { UserBuilder } from "builders/UserBuilder";
import { User } from "models/User";

const __userBuilderDemo__: React.FC = () => {

    const handleBuildUser = () => {
        const user: User = new UserBuilder()
            .setDisplayName("Ricky Gervais")
            .setEmail("rickyg@gmail.com")
            .setGuest(false)
            .build();

        console.log(user);
    }

    const buttonStyle: string = "border-2 border-slate-500";

    return (
        <>
            <div>
                <button onClick={handleBuildUser} className={buttonStyle}>Build User!</button>
            </div>
        </>
    )
}

export default __userBuilderDemo__;