import { useState } from 'react';
import axios from 'axios';
//type UploadStatus = "idle" | "uploading" | "success" | "error";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {    
    e.stopPropagation();
    if(e.target.files){     
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload(){
    if(!file) return;
    setStatus("uploading");

    const formData = new FormData();
    formData.append('file',file);

    try{
      await axios.post("https://httpbin.org/post" , formData , {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });
      setStatus("success");
    }catch{
      setStatus("error");
    }
  }
  return (
    <div>
      
        <input type="file" name="filename" onChange={handleFileChange}/>
        {file  && (<div className="display">
          {/* <img src={file} alt={file.name} width={100} height={100} /> */}
          <p>File: {file.name}</p>
          <p>Size: {(file.size/1024).toFixed(2)} kb</p>
          <p>Type: {file.type}</p>
        </div>)}

        {(file && status !== "uploading") && 
          <button onChange={handleFileUpload}> Upload</button> 
        }
        
        {(status && status === "success") && 
          <p>File uploaded successfully</p> 
        }
         {(status && status === "error") && 
           <p>There is some error in file uploading</p> 
        }        
        
    </div>
  )
}

export default App
