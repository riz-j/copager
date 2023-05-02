import './LandingPage.css'

const LandingPage: React.FC = () => {
    const debug: boolean = false;

    return (
        <>
            <div className="flex flex-col h-screen bg-canvas">
                <div className={`flex items-center h-28 p-5 ${debug && "bg-orange-100"}`}>
                    <h1 className="text-3xl font-bold mx-3 text-black bg-white p-1">
                        copager
                    </h1>
                </div>
                <div className={`flex flex-col justify-end items-center ${debug && "bg-rose-100"} h-96 text-center`}>
                    <h1 className="text-4xl font-bold bg-white px-5">
                        Talk with People <span className='text-purple-600'>Connected</span> to the same <span className='text-purple-600'>Wifi</span> as you
                    </h1>
                    <p className='text-black/60 bg-white p-5'>
                        Copager is an online LAN chat app that allows you to chat with people that are connected to the same wifi network as you.
                    </p>
                    <div className="flex flex-col w-full gap-3 bg-white px-5">
                        <div className="flex justify-center items-center bg-purple-500 w-full h-12 border-2 border-black shadow-solid-primary">
                            <p className='font-bold text-white'>OPEN CHAT</p>
                        </div>
                        <div className="flex justify-center items-center bg-white border-2 border-black w-full h-12 shadow-solid-primary">
                            <p className='font-bold text-black'>VIEW ON GITHUB</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;