import { 
    ChangeEvent, 
    useState, 
    useEffect,
    useRef, 
    useContext, 
    DragEvent 
} from "react";
import { SocketContext } from "contexts/SocketContext";
import { MessageBuilder } from "builders/MessageBuilder";
import { Message } from "models/Message";
import axios from "axios";
import { SheetWrapperContext } from "container-wrappers/SheetWrapper";
import { useDimensions } from "hooks/useDimensions";
import upload_cloud from "assets/upload-cloud.svg";

interface ApiResponse {
    message: string
    URL: string
}

const FileUploader: React.FC = () => {
    const socket = useContext(SocketContext);
    const fileUploaderUrl: string = import.meta.env.VITE_FILE_UPLOADER;
    const currentUserId: string | null = localStorage.getItem('currentUserId');
    const pubLanRoom: string | null = localStorage.getItem("pubLanRoom");

    const { handleCloseSheet } = useContext(SheetWrapperContext);

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

            if (targetFile.size > 2097152) {
                alert("File is too big! Maximum file size is 2 MB");
                setFile(null);
                throw new Error("File size is too big");
            }

            setFile(targetFile);
            setFilename(targetFile.name);

            let _fileType: string = targetFile.type.split("/")[0].toLowerCase();
            if (_fileType !== "image") {
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

                    handleCloseSheet();
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

    const [imageBlob, setImageBlob] = useState<string | null>();

    useEffect(() => {
        if (file && fileType === "image") {
            const imageURL = URL.createObjectURL(file);
            setImageBlob(imageURL)
        }
    }, [file, fileType])

    const { screenWidth } = useDimensions();

    const fileInput = useRef<HTMLInputElement | null>(null);
    const handleSelectFileClick = () => {
        if (fileInput.current) {
            fileInput.current.focus();
            fileInput.current.click();
        }
    }

    if (screenWidth >= 1024) { 
        /** For Desktop */
        return (
                <div className="flex flex-col justify-center bg-yellow-200 h-full w-full 
                                lg:pr-96"   
                >
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

    } else {
        
        /** For Mobile and Tablets */
        return (
            <>
            <div className="flex flex-col gap-5 justify-between bg-gray-100 h-full w-full p-5 lg:pr-96">
                {/* <div className="bg-yellow-200">
                    <h1>Hello there</h1>
                    { loading && <h3>Loading...</h3> }
                </div> */}
                <div className="flex flex-col justify-center items-center w-full h-full z-10 cursor-pointer">   
                    { !loading &&
                        ( (imageBlob) ?
                            <img 
                                src={imageBlob}
                                className="max-h-full max-w-full" 
                            />
                            :
                            <img 
                                src={upload_cloud}
                                className="w-16" 
                            />
                        )
                    }
                    { (filename && !imageBlob && !loading) &&
                        <p className="text-lg">
                            {filename}
                        </p>
                    } 
                    { (!filename && !loading) &&
                        <p className="text-lg">
                            Select File
                        </p>
                    }
                    { (loading) && 
                        <h3>Loading...</h3> 
                    }
                </div>
                <div className="flex flex-col justify-center items-center gap-2 font-bold">
                    <button 
                        onClick={handleSelectFileClick}
                        className={`border border-black text-lg w-full py-3 rounded-lg
                                    ${file ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'}`}
                    >
                        Browse Files
                    </button>
                    { file &&
                        <button 
                            onClick={handleFileUpload}
                            className="border border-black bg-blue-500 text-white text-lg w-full py-3 rounded-lg"
                        >
                            Send
                        </button>
                    }
                </div>
            </div>
            <input 
                type="file" 
                onChange={handleFileChange}
                ref={fileInput}
                className="cursor-pointer z-30 opacity-0"
            />
            </>
        )
    }
}

export default FileUploader;