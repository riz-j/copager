// import ChatHeader from "containers/ChatHeader.container";
import ChatBox from "containers/ChatBox.container";
import ChatFeed from "containers/ChatFeed.container";
import LeftSidebar from "containers/LeftSidebar.container";

const Dashboard: React.FC = () => {
    return (
        <>
            <div className="flex font-ibm-plex">
                <div className="fixed h-screen hidden border-r border-gray-200
                                lg:block lg:w-96">  {/** For Desktop and Horizontal Tablets */}
                    <LeftSidebar/> 
                </div>
                <div className="flex flex-col w-full h-screen pb-20
                                lg:ml-96"> 
                    <div className="relative flex-1">
                        <ChatFeed/> 
                    </div>
                    
                    <div className="fixed bottom-0 right-0 w-full
                                    lg:left-96 lg:w-auto"> 
                        <ChatBox/> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;




        // ----------------------------------------------------------------------------
        //  Use the template below to have custom reponsiveness for md and lg screens
        // ----------------------------------------------------------------------------
        // <div className="flex">
        //     <div className="fixed h-screen bg-red-500 hidden 
        //                     md:block md:w-80 lg:w-96">  {/** For Desktop and Tablets */}
        //         <p>Hello</p>
        //     </div>
        //     <div className="flex flex-col w-full 
        //                     md:ml-80 lg:ml-96"> {/** For Desktop and Tablets */}
        //         <div className="relative flex-1">
        //             <ChatFeed/> 
        //         </div>
                
        //         <div className="fixed bottom-0 right-0 w-full
        //                         md:left-80 lg:left-96 md:w-auto"> {/** For Desktop and Tablets */}
        //             <ChatBox/> 
        //         </div>
        //     </div>
        // </div>