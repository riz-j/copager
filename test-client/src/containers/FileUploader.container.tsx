import FileUploadBox from "components/FileUploadBox.component"
import { ChangeEvent, useState, useEffect, useContext } from "react";
import axios from "axios";
import { SocketContext } from "contexts/SocketContext";
import { MessageBuilder } from "builders/MessageBuilder";
import { Message } from "models/Message";

interface ApiResponse {
    message: string
    URL: string
}

const FileUploader: React.FC = () => {
    const socket = useContext(SocketContext);
    const fileUploaderUrl: string = import.meta.env.VITE_FILE_UPLOADER;
    const currentUserId: string | null = localStorage.getItem('currentUserId');
    const pubLanRoom: string | null = localStorage.getItem("pubLanRoom");

    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    /** API Response */
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [apiResStatus, setApiResStatus] = useState<number | null>(null);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
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

    useEffect(() => {
        if (apiResStatus && apiResponse && socket && currentUserId && pubLanRoom) {
            console.log("API Res Status: " + apiResStatus);
            console.log("API Response: " + JSON.stringify(apiResponse));

            const fileUrl: string = apiResponse.URL;
            
            if (fileUrl) {
                const _message: Message = new MessageBuilder()
                    .setType("file")
                    .setMessage(fileUrl)
                    .setSender(currentUserId)
                    .setRoom(pubLanRoom)
                    .build()
                    
                try {
                    socket.emit("on_message", _message);
                } catch (err) {
                    console.error("Failed to send file message to socket");
                }
            }
        }
    }, [apiResStatus, apiResponse, currentUserId, pubLanRoom])

    return (
        <FileUploadBox 
            serverUrl={fileUploaderUrl}
            loading={loading}
            onFileChange={handleFileChange}
            onFileUpload={handleFileUpload}
        />
    )
}

export default FileUploader;