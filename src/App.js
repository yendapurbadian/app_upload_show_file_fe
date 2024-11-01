import React, {useState} from 'react';
import axios from 'axios';

import './App.css';
import Upload from './pro-upload/upload/Upload'

function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showImages, setShowImages] = useState(false);

    const getImages = () => {
        setLoading(true);
        axios.get(
            'http://localhost:5000/api/v1/graph/images/get-data'
            // 'http://103.84.207.4/api-gateway/api/v1/graph/images/get-data'
        )
        .then(result => {
            setData(result.data.result);
            setLoading(false);
            setShowImages(true);
        })
        .catch(error => {
            setLoading(false)
            console.log('ERROR : ', error)
        })
    }

    const handleShowingImages = (pathDir) => {
        var result;
        result = 'http://localhost:5000/api/v1/graph/show/images?path=' + pathDir;
        // result = 'http://103.84.207.4/api-gateway/api/v1/graph/show/images?path=' + pathDir;

        return result
    }

    return (
        <div className="App">
            <button className='button' onClick={() => getImages()}>Show Images</button>
            <Upload formatUpload={["image/jpg", "image/jpeg", "image/png"]} />
            {
                loading ? (
                    <div className='loader' />
                ) : (
                    <div className='gallery-box'>
                        {
                            showImages && (
                                data.length>0 && (
                                    data.map((val, ind) => {
                                        return (
                                            <img src={handleShowingImages(val.path_directory)} key={ind}/>
                                        )
                                    })
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default App;
