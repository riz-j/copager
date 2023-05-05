import "./styles/LeftSidebar.css"
import FileUploader from "./FileUploader.container"

const LeftSidebar: React.FC = () => {

    return (
        <>
            <div className="h-full w-full bg-red-200 border-r border-gray-200">
                <div className="flex justify-center items-center w-full h-1/2 bg-blue-500 border-b border-gray-200">
                    {/* <p>This sidebar is under construction</p> */}
                    <FileUploader />
                </div>
            </div>
        </>
    )
}

export default LeftSidebar