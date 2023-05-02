import './LandingPage.css'

const LandingPage: React.FC = () => {
    const debug: boolean = false;

    return (
        <>
            <div className="flex flex-col h-screen p-5">
                <div className={`flex items-center h-28 ${debug && "bg-orange-100"}`}>
                    <h1 className="text-3xl font-bold">
                        <span className="text-red-500">co</span>
                        <span className="text-red-500">pager</span>
                    </h1>
                </div>
                <div className={`flex flex-col justify-end items-center gap-5 ${debug && "bg-pink-100"} h-96 text-center`}>
                    <h1 className="text-4xl font-bold">Talk with People Connected to the same Wifi as you</h1>
                    <p>Copager is an online LAN chat app that allows you to chat with people that are connected to the same wifi network as you.</p>
                    <div className="flex flex-col w-full gap-3">
                        <div className="flex justify-center items-center border border-gray-500 w-full h-10">
                            <p>Open Chat</p>
                        </div>
                        <div className="flex justify-center items-center border border-gray-500 w-full h-10">
                            <p>View on GitHub</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;