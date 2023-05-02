import ChatBox from "containers/ChatBox.container";
import ChatFeed from "containers/ChatFeed.container";
import ChatHeader from "containers/ChatHeader.container";

const Dashboard: React.FC = () => {
    return (
        <>
            <div className="flex">
                <div className="h-screen bg-red-500 w-96">
                    <p>Hello</p>
                </div>
                <div className="flex flex-col">
                    <ChatBox/>
                    <ChatFeed/>
                </div>
            </div>
        </>
    )
}

export default Dashboard;