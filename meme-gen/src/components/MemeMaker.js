import { useState } from 'react';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './MemeMaker.css';

toast.configure();
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
    
    const updateImageUrl = (URL) => {
        setImageUrl(URL);
    }

    const getGeneratedMemeURL = async() => {

        let url=`https://api.imgflip.com/caption_image?template_id=${props.props.id}&username=KartikGupta3&password=leiwulong123`
        inputs.map((item,index)=>{
            url = url + `&boxes[${index}][text]=${item}`;
        })
        console.log(url); 
        let updatedURLData = await fetch(url);
        let updatedJSONResponse = await updatedURLData.json();

        try {
                updateImageUrl(updatedJSONResponse.data.url);
                toast.success("Meme Generated Successfully✅ ", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
        }
        catch(err) {
            toast.error("⚠ Could not generate meme", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
           
        }
    }

    const generateMeme = () => {

        getGeneratedMemeURL();   
    }

    return(
        <>

        <button className="go-back-btn" onClick={() => {
                                                    props.updateClickedMemeData({id:0})
                                                    setInputs([...Array(props.props.box_count)].map(()=> 0))}}>
            <ArrowBackIosIcon/>
        </button>

        <div className="meme-maker" style={{color:"#FFF"}}>
            <button autoFocus></button>
            <img className="target-image" src={imageUrl} alt={props.props.name}/>
            
            <div className="input-container">
            {
            [...Array(props.props.box_count)].map((element, index)=> <input className="text-field-input"
                                                                            placeholder={`Text ${index+1}`}
                                                                            key={index}
                                                                            onChange={(event) => {updateSetInputs(event.target.value,index)}} />)
            }
            </div>

            <div>
                <button className="download-btn"
                        onClick={() => {downloadImage(imageUrl, `meme-gen-${props.props.name}.jpg`)}} > DOWNLOAD </button>
                <button className="generate-btn"
                        onClick={()=> {
                            console.log(inputs);
                            generateMeme();
                        }}>GENERATE MEME !</button>
            </div>

            <div></div>
        </div>
        
        </>
    )
};

export default MemeMaker;