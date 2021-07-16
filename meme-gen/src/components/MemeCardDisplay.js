import './MemeCardDisplay.css';

const MemeCardDisplay = (props) => {

    return (
        <div className="meme-card-container"
             onClick={()=> {props.setClickedMemeData(props.meme)}} >
                 
            <div className="meme-image" style={{backgroundImage: `url(${props.meme.url})`}} alt={props.meme.name}/>
            <div className="meme-name">{props.meme.name.substring(0,34)}</div>
        </div>
    )
}

export default MemeCardDisplay
