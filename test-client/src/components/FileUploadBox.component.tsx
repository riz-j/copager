import { ChangeEvent } from "react";

interface FileUploadBoxProps {
    serverUrl: string
    loading: boolean
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
    onFileUpload: () => void 
}

const FileUploadBox: React.FC<FileUploadBoxProps> = (props) => {
    return (
        <>
            <div className="bg-yellow-200">
                <h1>Hello there</h1>
                { props.loading && <h3>Loading...</h3> }
                <input 
                    type="file" 
                    onChange={props.onFileChange}
                />
                <button 
                    onClick={props.onFileUpload}
                    className="border border-black hover:bg-green-500"
                >Upload</button>
            </div>
        </>
    )
}

export default FileUploadBox;