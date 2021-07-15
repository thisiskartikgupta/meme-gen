import { useState, useEffect } from 'react';

import './App.css';
import MemeCardDisplay from './components/MemeCardDisplay';
import MaterialHeader from "./components/MaterialHeader";
import MemeMaker from './components/MemeMaker';

const App = () => {

  const [AppData, setAppData] = useState({});
  const [clickedMemeData, setClickedMemeData] = useState({id: 0});

  function updateAppData(newState) {
    setAppData(newState);
  }

  function updateClickedMemeData(MEME_DATA) {
    setClickedMemeData(MEME_DATA);
    console.log(clickedMemeData);
  }

  const setAppDataFromMemeAPI = async()=>{

    let response = await fetch("https://api.imgflip.com/get_memes");
    let JSONResponse = await response.json();
    console.log(JSONResponse);
    updateAppData(JSONResponse);
  };

  useEffect(() => {
    setAppDataFromMemeAPI();
  }, []);

  return(
    <div className="App">
      <MaterialHeader />
        {
          (clickedMemeData.id === 0)
          ?  
              (AppData.success === true) 
                ? <div className="meme-card-display-container">
                   {
                    [...AppData.data.memes].map((element) => <MemeCardDisplay key={element.id}
                                                                              meme={element}
                                                                              setClickedMemeData={updateClickedMemeData} />)
                   }
                  </div>

                : <div style={{color:"#EEE"}}>No memes found💔. Please reload the page</div>
             

          : <MemeMaker props={clickedMemeData} updateClickedMemeData={updateClickedMemeData}/> 
        }
    </div>
  )
};

export default App;
