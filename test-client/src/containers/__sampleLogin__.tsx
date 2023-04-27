import { v4 as uuidv4 } from "uuid"

const __sampleLogin__: React.FC = () => {
    const sampleUserId: string = uuidv4();

    const handleLogIn = () => {
        const currentUserId: string | null = localStorage.getItem('currentUserId');
        if (!currentUserId) {
            localStorage.setItem('currentUserId', sampleUserId);
        }
    }

    const handleLogOut = () => {
        const currentUserId: string | null = localStorage.getItem('currentUserId');
        if (currentUserId) {
            localStorage.removeItem('currentUserId');
        }
    }
    
    return (
        <div className="absolute top-1 right-1 gap-2">
            <button onClick={handleLogIn} className="border border-slate-500">Sample Log In</button>
            <button onClick={handleLogOut} className="border border-slate-500">Sample Log Out</button>
        </div>
    )    
}

export default __sampleLogin__;