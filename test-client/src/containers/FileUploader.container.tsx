import FileUploadBox from "components/FileUploadBox.component"
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";

interface ApiResponse {
    message: string
    url: string
}

const FileUploader: React.FC = () => {
    const fileUploaderUrl: string = import.meta.env.VITE_FILE_UPLOADER;
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
        if (apiResStatus && apiResponse) {
            console.log("API Res Status: " + apiResStatus);
            console.log("API Response: " + JSON.stringify(apiResponse));
        }
    }, [apiResStatus, apiResponse])

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