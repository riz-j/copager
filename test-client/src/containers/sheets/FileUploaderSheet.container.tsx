import { 
    ChangeEvent, 
    useState, 
    useEffect, 
    useContext, 
    DragEvent 
} from "react";
import { SocketContext } from "contexts/SocketContext";
import { MessageBuilder } from "builders/MessageBuilder";
import { Message } from "models/Message";
import axios from "axios";
// import { SheetWrapperContext } from "container-wrappers/SheetWrapper";

interface ApiResponse {
    message: string
    URL: string
}

const FileUploaderSheet: React.FC = () => {
    const socket = useContext(SocketContext);
    const fileUploaderUrl: string = import.meta.env.VITE_FILE_UPLOADER;
    const currentUserId: string | null = localStorage.getItem('currentUserId');
    const pubLanRoom: string | null = localStorage.getItem("pubLanRoom");

    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<string>("");
    const [filename, setFilename] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [dragOver, setDragOver] = useState<boolean>(false);

    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [apiResStatus, setApiResStatus] = useState<number | null>(null);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const targetFile: File = e.target.files[0];

            setFile(targetFile);
            setFilename(targetFile.name);

            let _fileType: string = targetFile.type.split("/")[0].toLowerCase();
            if (_fileType !== "image" && _fileType !== "video") {
                _fileType = "file";
            }
            setFileType(_fileType)
        }
    }

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                setLoading(true);
                const response = await axios.post(
                    fileUploaderUrl, 
                    formData, 
                    { headers: {
                        'Content-Type': 'multipart/form-data'
                    }}
                );
                setLoading(false);

                setApiResStatus(response.status);
                setApiResponse(response.data);

            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    }
    
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const inputFile = e.dataTransfer.files[0];
            setFile(inputFile);
            setFilename(inputFile.name);

            console.log(inputFile);
        }
    }

    useEffect(() => {
        if (apiResStatus && 
            apiResponse && 
            socket && 
            currentUserId && 
            pubLanRoom && 
            filename
        ) {
            console.log("API Res Status: " + apiResStatus);
            console.log("API Response: " + JSON.stringify(apiResponse));

            const fileUrl: string = apiResponse.URL

            if (fileUrl) {
                const _message: Message = new MessageBuilder()
                    .setType(fileType)
                    .setMessage(" ")
                    .setFilename(filename)
                    .setUrl(fileUrl)
                    .setSender(currentUserId)
                    .setRoom(pubLanRoom)
                    .build()
                    
                try {
                    socket.emit("on_message", _message);

                } catch (err) {
                    console.error("Failed to send file message to websocket");
                } finally {
                    setFile(null);
                    setFilename("");
                    setApiResStatus(null);
                    setApiResponse(null);
                }

            }
        }
    }, [
        apiResStatus, 
        apiResponse, 
        currentUserId, 
        pubLanRoom, 
        filename, 
        socket
    ])


    return (
        <div className="fixed bottom-0 w-full h-screen bg-yellow-200 transition-transform duration-500 translate-y-96 hover:translate-y-0">
                <h1>Hello there</h1>
                { loading && <h3>Loading...</h3> }
                <div 
                    onDragOver={handleDragOver}
                    onDragExit={() => setDragOver(false)}
                    onMouseLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`h-24 ${ dragOver ? 'bg-red-500' : 'bg-purple-400' }`}
                >
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="bg-green-200 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <p>{filename ? filename : "Drop file here"}</p>
                <button 
                    onClick={handleFileUpload}
                    className="border border-black hover:bg-green-500"
                >Upload</button>
            </div>
    )
}

export default FileUploaderSheet;