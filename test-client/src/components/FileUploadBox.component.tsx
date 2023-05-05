// import { ChangeEvent, DragEvent } from "react";

// interface FileUploadBoxProps {
//     serverUrl: string
//     loading: boolean
//     setFile: (file: File | null) => void
//     onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
//     onFileUpload: () => void 
// }

// const FileUploadBox: React.FC<FileUploadBoxProps> = (props) => {
//     const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         e.stopPropagation();
//     }
    
//     const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         e.stopPropagation();

//         if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//             const inputFile = e.dataTransfer.files[0];
//             props.setFile(inputFile);

//             console.log(inputFile);
//         }
//     }

//     return (
//         <>
//             <div className="bg-yellow-200">
//                 <h1>Hello there</h1>
//                 { props.loading && <h3>Loading...</h3> }
//                 <div 
//                     onDragOver={handleDragOver}
//                     onDrop={handleDrop}
//                     className="p-10 bg-pink-200"
//                 >
//                     <input 
//                         type="file" 
//                         onChange={props.onFileChange}
//                     />
//                 </div>
//                 <button 
//                     onClick={props.onFileUpload}
//                     className="border border-black hover:bg-green-500"
//                 >Upload</button>
//             </div>
//         </>
//     )
// }

// export default FileUploadBox;