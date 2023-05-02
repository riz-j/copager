import './LandingPage.css'
import chat_icon from 'assets/chat-lines.png'
import github_icon from 'assets/github-icon.png'

const LandingPage: React.FC = () => {
    const debug: boolean = false;

    return (
        <>
            <div className="flex flex-col h-screen bg-lime-200 bg-canvas">
                <div className={`flex items-center h-28 ${debug && "bg-orange-100"}`}>
                    <h1 className="text-3xl font-bold mx-3 text-black bg-lime-200 p-8">
                        copager
                    </h1>
                </div>
                <div className={`flex flex-col justify-center items-center ${debug && "bg-rose-100"} h-[26rem] text-center`}>
                    <h1 className="text-4xl font-bold bg-lime-200 px-5">
                        Chat with People <span className='text-purple-600'>Connected</span> to the same <span className='text-purple-600'>Wifi</span> as you
                    </h1>
                    <p className='text-black/60 bg-lime-200 p-5'>
                        Copager is an online LAN chat app that allows you to chat with people that are connected to the same wifi network as you.
                    </p>
                    <div className="flex flex-col w-full gap-4 bg-lime-200 px-5">
                        <div className="flex justify-center items-center gap-2 bg-purple-500 w-full h-12 border-2 border-black shadow-solid-primary">
                            <div className='pb-[0.1rem]'>
                                <img src={chat_icon} className='h-[1.2rem]'/>
                            </div>
                            <p className='font-bold text-white'>OPEN CHAT</p>
                        </div>
                        <div className="flex justify-center items-center gap-[0.4rem] bg-lime-200 border-2 border-black w-full h-12 shadow-solid-primary">
                            <div className='pb-[0.1rem]'>
                                <img src={github_icon} className='h-5' />
                            </div>
                            <p className='font-bold text-black'>VIEW ON GITHUB</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;