import ChatBox from "containers/ChatBox.container";
import ChatFeed from "containers/ChatFeed.container";
import ChatHeader from "containers/ChatHeader.container";

const Dashboard: React.FC = () => {
    return (
        <>
            <div className="flex">
                <div className="fixed h-screen bg-red-500 w-96">
                    <p>Hello</p>
                </div>
                <div className="flex flex-col w-full ml-96">
                    <div className="flex-1 relative">
                        <ChatFeed/> {/** This has position relative */}
                    </div>
                    <div className="fixed left-96 bottom-0 right-0">
                        <ChatBox/> {/** This has position fixed and width 100% */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;