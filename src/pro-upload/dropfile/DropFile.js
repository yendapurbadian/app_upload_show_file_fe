import { useRef, useState } from "react";
import imgDropFile from '../images/dropfile.svg'

import './DropFile.css'

function DropFile(props) {
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});
    // const [disabledUpload, setDisabledUpload] = useState(false);
    const [highlight, setHighlight] = useState(false);

    const openDialogFile = () => {
        if(props.disabledUpload) return;
        fileInputRef.current.click();
    }

    const onFilesAdded = (evt) => {
        if(props.disabledUpload) return;
        evt.preventDefault();

        const files = evt.target.files;
        console.log('files', files)
        const arrayFiles = fileListToArray(files);

        if(arrayFiles.length>0) {
            setErrors({});
            // setDisabledUpload(true);
            props.onUploadFiles(arrayFiles);
        }
        else {
            evt.target.value = null
            let formatFiles  = JSON.stringify(props.validateUpload);
            const err        = { message: `Upload gagal.. Hanya format ${formatFiles} yang diperbolehkan!!` };
            setErrors(err)
        }
    }

    const onDragOver = (evt) => {
        evt.preventDefault();

        if(props.disabledUpload) return;
        setHighlight(true);
    }

    const onDragLeave = (evt) => {
        setHighlight(false);
    }

    const onDrop = (evt) => {
        if(props.disabledUpload) return;
        evt.preventDefault();

        const files = evt.dataTransfer.files;
        console.log('onDrop', files)
        const arrayFiles = fileListToArray(files);

        if(arrayFiles.length>0) {
            setErrors({});
            // setDisabledUpload(true);
            props.onUploadFiles(arrayFiles);
        }
        else {
            evt.target.value = null
            let formatFiles  = JSON.stringify(props.validateUpload);
            const err        = { message: `Upload gagal.. Hanya format ${formatFiles} yang diperbolehkan!!` };
            setErrors(err)
        }

        setHighlight(false)
    }

    const fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            const loopProps = props.validateUpload.indexOf(list.item(i).type)
            if(loopProps !== -1) {
                array.push(list.item(i));
            }
        }
        
        return array;
    }

    return (
        <div>
            {
                errors?.message && ( 
                    <div className="alert-message error">
                        <span 
                            className="alert-closebtn"
                            onClick={(evt) => evt.target.parentElement.style.display='none'}
                        >
                            &times;
                        </span>  
                        {errors.message}
                    </div>
                )
            }
            
            <div 
                className={`dropfile ${highlight ? "dropfiles-highlight" : ''}`}
                onClick={openDialogFile}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                style={{ cursor: props.disabledUpload ? "default" : "pointer" }}
            >
                <img 
                    alt="upload"
                    src={imgDropFile}
                    className='img-upload'
                />
                <input 
                    type="file"
                    name="uploaded_file"
                    className="file-input"
                    ref={fileInputRef}
                    onChange={onFilesAdded}
                />
                <span>Upload Files</span>
            </div>
        </div>
    )
}

export default DropFile