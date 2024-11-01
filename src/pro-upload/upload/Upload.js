import { useState } from 'react'
import './Upload.css'
import DropFile from '../dropfile/DropFile'
import ProgressUpload from '../progress/ProgressUpload'

function Upload(props) {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [disabledUpload, setDisabledUpload] = useState(false);

    const onUploadFiles = async(file) => {
        setFiles(file);

        const promises = [];

        file.forEach(val => {
            promises.push(sendRequestUpload(val));
        });

        try {
            setDisabledUpload(true);
            await Promise.all(promises);
            setFiles([])
            setDisabledUpload(false)
        } catch (error) {
            console.log('error', error)
        }
    }

    const sendRequestUpload = (val) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.upload.addEventListener("progress", event => {
                if(event.lengthComputable) {
                    const copy = { ...uploadProgress }
                    copy[val.name] = {
                        state: 'pending',
                        filename: val.name,
                        percentage: (event.loaded / event.total) * 100
                    }

                    setUploadProgress(copy)
                }
            })

            req.upload.addEventListener("load", event => {
                const copy = { ...uploadProgress }
                copy[val.name] = {
                    state: 'done',
                    filename: val.name,
                    percentage: 100
                }

                setUploadProgress(copy)
                resolve(req.response)
            })

            req.upload.addEventListener("error", event => {
                const copy = { ...uploadProgress }
                copy[val.name] = {
                    state: 'error',
                    filename: val.name,
                    percentage: 0
                }

                setUploadProgress(copy)
                reject(req.response)
            })

            let data = new FormData();
            data.append('uploaded_file', val);

            req.open("POST", "http://localhost:5000/api/v1/upload/graph/file");
            // req.open("POST", "http://103.84.207.4/api-gateway/api/v1/upload/graph/file");
            req.send(data);
        })
    }

    return(
        <div className="container">
            <div className='upload-wrapper'>
                <span className='title'>
                    Upload Files
                </span>
                <div className='content'>
                    <DropFile validateUpload={props.formatUpload} onUploadFiles={onUploadFiles} disabledUpload={disabledUpload} />
                    {
                        files.length>0 && (
                            files.map((val, ind) => {
                                return (
                                    <ProgressUpload 
                                        key={ind}
                                        uploadProgress={uploadProgress}
                                        filenameUpload={val.name}
                                    />
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Upload