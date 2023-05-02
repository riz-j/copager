import ChatBox from "containers/ChatBox.container";
import ChatFeed from "containers/ChatFeed.container";
import ChatHeader from "containers/ChatHeader.container";

const Dashboard: React.FC = () => {
    return (
        <>
            <div className="flex">
                <div className="fixed h-screen bg-red-500 w-96 hidden 
                                md:block">  {/** For Desktop and Tablets */}
                    <p>Hello</p>
                </div>
                <div className="flex flex-col w-full 
                                md:ml-96"> 
                    <div className="relative flex-1">
                        <ChatFeed/> 
                    </div>
                    
                    <div className="fixed bottom-0 right-0 w-full
                                    md:left-96 md:w-auto"> 
                        <ChatBox/> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;