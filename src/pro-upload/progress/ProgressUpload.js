import './ProgressUpload.css'
import checkCircle from '../images/check_circle-24px.svg';

export default function ProgressUpload(props) {
    const uploadFiles = props.uploadProgress[props.filenameUpload]

    return (
        <div className='box-progress-files'>
            <div className='box-files'>
                <span className='row-files-name'>{uploadFiles?.filename}</span>
            </div>
            <div className='box-progress-bar'>
                <div className='progress-line' style={{ width: uploadFiles?.filename ? `${uploadFiles?.percentage}%` : 0 }}></div>
            </div>
            <div className='box-progress-percentage'>
                <span className='row-progress-percentage'>{`${uploadFiles?.percentage}%`} terunggah</span>
                {uploadFiles?.percentage === 100 && <img className='check-icon' alt='done' src={checkCircle} />}
            </div>
        </div>
    )
}
