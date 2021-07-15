import { useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './MemeMaker.css';

const MemeMaker = (props) => {

    const [imageUrl, setImageUrl] = useState(props.props.url);
    const [inputs, setInputs] = useState([...Array(props.props.box_count)].map(()=> 0));

    const updateSetInputs = (updateValue, updateIndex) => {

        let cloneInputs = [...inputs];
        cloneInputs[updateIndex] = updateValue;
        setInputs(cloneInputs); 
    };

    const downloadImage = (IMAGE_URL, downloadedFileName) => {
        var XHRRequest = new XMLHttpRequest();
        XHRRequest.open("GET", IMAGE_URL, true);
        XHRRequest.responseType = "blob";
        
        XHRRequest.onload = function(){
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = downloadedFileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        XHRRequest.send();
    }
    

    return(
        <>

        <button className="go-back-btn" onClick={() => {
                                                    props.updateClickedMemeData({id:0})
                                                    setInputs([...Array(props.props.box_count)].map(()=> 0))}}>
            <ArrowBackIosIcon/>
        </button>

        <div className="meme-maker" style={{color:"#FFF"}}>
            
            <img className="target-image" src={imageUrl} alt={props.props.name}/>
            
            <div className="input-container">
            {
            [...Array(props.props.box_count)].map((element, index)=> <input className="text-field-input"
                                                                            placeholder={`Text ${index+1}`}
                                                                            key={index}
                                                                            onChange={(event) => {updateSetInputs(event.target.value,index)}}/>)
            }
            </div>

            <div>
                <button className="download-btn"
                        onClick={() => {downloadImage(imageUrl, `meme-gen-${props.props.name}.jpg`)}} > DOWNLOAD </button>
                <button className="generate-btn"
                        onClick={()=> {
                            console.log(inputs);
                        }}>GENERATE MEME !</button>
            </div>

            {JSON.stringify(props.props)}
        </div>
        
        </>
    )
};

export default MemeMaker;