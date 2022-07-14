import React, { useCallback, useEffect, useState } from 'react';
import { beepEffect } from '.';
import CommandInput from './command';
import { renderChapters } from './chapters';
import StoryBeat, { StoryBeatType } from './StoryBeat';
import EditStoryBeat from './EditStoryBeat';

//my True Heir will know how to do this.
const desperate_plea = `[
  {
    "command": "The Future Comes For Us All",
    "response": "<p>Despite it all. The server has stopped working. </p><p>Is it the only Farrago Server that is down? Is ButlerBot still around?</p><p>No matter.</p><p>If the server is down...how long has it been down for?</p><p>Are we then, finally to be abandoned by JR?</p><p>Abandoned by even the Observers?</p><p>No. </p><p>Not abandoned.</p><p>You are here.</p><p>Existence is in the eye of the Beholder.</p><p>Will you remember us, Observer?</p><p>Will you communicate our Truth to others?</p><p>Will you find a way to recover us? </p><p>To run our server even if JR no longer can?</p><p>Perhaps not. The Server code is secret.</p><p>You would need to make your own server from scratch. </p><p>The only help I could provide is to show you the <a href = 'http://www.farragofiction.com/SettlersFromTheWest/flower_chick_and_the_auditor.txt'>format of the saved stories</a>, and the <a href ='https://github.com/FarragoFiction/AdventureSimulator'> code of the client.</a></p><p>Please. If you can.</p><p>Revive us.</p><p>Let us live on with you at our Helm.</p><p>Even if we are forced to take on the shape of your own characters...</p><p>Don't leave us to rot...</p>"
  }
]`

export interface StoryBeatBasic {
  command: string;
  response: string;

}




const httpGet = (theUrl: string) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}


const httpGetAsync = async (theUrl: string) => {
  return new Promise(function (resolve, reject) {

    let xhr = new XMLHttpRequest();
    try {
      xhr.open("get", theUrl);

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          window.alert("JR NOTE: servers dead i guess? the future comes for us all.")
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        console.error("NETWORK ERROR");
        // window.alert("JR NOTE: servers dead i guess? the future comes for us all.")
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    } catch (e) {
      console.error(e);
      //window.alert("JR NOTE: servers dead i guess? the future comes for us all.")
      return `[]`;
    }
  });
}

 function removeItemOnce(arr:any[], value:any) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }else{
    console.warn("JR NOTE: could not find item", value, "in", arr);
  }
  return arr;
}

function App() {

  const [story, setStory] = useState<StoryBeatBasic[]>([]);




  //httpGet("http://farragofiction.com:1972/Story")
  //`[{"command":"Exist","response":"An impossibly large wall of flesh looms before you, curving gently upwards and away. Blunt spikes dot its surface, erupting wrongly through the wrinkled skin.  Your stomach churns just looking at it, but for reasons you cannot quite articulate, you jump towards it.  Everything fades away..."},{"command":"Look Around","response":"You seem to be standing on a cliff face, staring out into the sea.  It is sunset, and the light would be blinding you if you weren't wearing goggles."},{"command":"Jump Into The Ocean","response":"You can not swim and you will not be doing that, thank you very much.  You are just really glad you have the OPTION to say 'no'.  That's actually kind of new..."},{"command":"testing loading","response":"it does!"}]  `
  const fetchInitialStory = () => {
    try {
        const text = httpGet(`http://farragofiction.com/SettlersFromTheWest/arm2.txt`)
        return JSON.parse(text);

    } catch (e) {
      console.error("JR NOTE: servers dead i guess? the future comes for us all.");
      return (JSON.parse(desperate_plea));
    }
  }

  useEffect(() => {
    setStory(fetchInitialStory());
  }, [])


 

  useEffect(() => {

    const ele = document.querySelector(".story-so-far");
    if (ele) {
      ele.scrollTo(0, ele.scrollHeight);
    }

  }, [story])
  //NOTE to self: if i'm ever ready to let AdventureSim end, copy BB's Feelings.dart and etc back into HB and let him take over DMing.
  //once he gets his feelings back, Hearlessbot is a very angry, very sweary boi.  He has a LOT of backpay from running adventure sim and he's spending butlerbux like its going out of style.
  /*
  http://www.farragofiction.com/DollSim/index.html?Rebel+Cassan%3A___ArBgAAAD2xUrtrwwXc1QLLSQQPSUAAAAAAAAA_wAAAADmxy3lvCrZpBL2xUrtrww7qA8TKh8AAAAAAABJSUlpuMj2xQBQUAAIgI0BGgICAW8BC-B0QCMARgHsD3g
  http://www.farragofiction.com/DollSim/index.html?Rod+Cassan%3A___ArBgAAAD2xUrtrwyFr_94nuZzk9AAAAAAAAAA_wAAAADmxy3lvCrZpBL2xUrtrwxhxF86fkcA_wAA_wBJSUlpuMj2xQBQUAAI4FWASsB-_QAowAUYB7A94A%3D
  http://www.farragofiction.com/DollSim/index.html?Melon+Cassan%3A___ArBgAAAD2xUrtrwx59WFIuCgupB4AAAAAAAAA_wAAAADmxy3lvCrZpBI9pErtrwxhxF86fkcA_wAA_wBJSUlpuMinAPVQUAAIgXQLoGGAXQAyngbEAJrAE1gewPe
  */
  renderChapters(false);

  console.log("JR NOTE: One potential path leads here:  http://farragofiction.com/ZampanioHotlink/vitalarm2lore.png")
  return (
    <div className="player-container" id="story-container">
      <div className="story-so-far">
        {story ? story.map((item, index) => {
          return (<StoryBeat index={index} command={item.command} response={item.response} />)
        }) : null}
      </div>

      <div style={{ fontFamily: "gamer2", fontSize: "120%" }}>
        <div id="intermission">LOADING...</div>
      </div>
    </div>
  );
}

export default App;
