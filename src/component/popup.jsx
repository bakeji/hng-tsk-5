import React from 'react';

export default function Popup() {  
    const startRecording=()=>{
        chrome.tabs.query({active: true, currentWindow: true }, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,{action: "request_recording"}, function(response){
                if(!chrome.runtime.lastError){
                    console.log(response)
                } else{
                    console.log(chrome.runtime.lastError, "error line 14")
                }

            } )
        })
    }

   


      return(
        <div  className="popup">
            <div className="top">
                <img src="/logo.png" alt="logo" />
                <div>
                <button><img src="/setting.png" alt="" /></button>
                <button><img src="/close-circle.png" alt=""/></button>
                </div>
            </div>
            <p className="text">This extension helps you record and share help videos with ease.</p>
                <div className="record">
                    <div className="rcd">
                        <button className="rcd1">
                            <img src="/monitor.png" alt="monitor-icon" />
                            <p>Full screen</p>
                        </button>

                        <button className="rcd2">
                            <img src="/tab.png" alt="" />
                            <p>Current Tab</p>
                        </button>
                    </div>

                    <div className="cam">
                        <span className="span-cam">
                            <img src="/video-camera.png" alt="" />
                            <p> Camera</p>
                        </span>
                        <label className="switch" htmlFor="camera">
                            <input className="checkbox" id="camera" type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="audio">
                        <span className="span-audio">
                            <img src="/speaker.png" alt="" />
                            <p> Audio</p>
                        </span>

                        <label className="switch">
                            <input className="checkbox" type="checkbox" />
                            <span cl className="slider round"></span>
                        </label>
                    </div>
                    <span className="rcd-btn">
                        <button id='start-recording' onClick={startRecording} >Start Recording</button>
                    </span>
                </div>
        </div>
    )
}