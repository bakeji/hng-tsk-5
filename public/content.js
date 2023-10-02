
 // const contentScriptUrl = chrome.runtime.getURL('content.js');
// console.log("hi, here is content.js");


// Create a div element
const divElement = document.createElement('div');

// Add a class to the div element
divElement.classList.add('my-div');

// Create an array to store the button HTML
const buttonHTML = [];

// Add button HTML to the array
buttonHTML.push('<p>00:00</p>');
buttonHTML.push('<hr/>')


buttonHTML.push('<button id="button-1">');
buttonHTML.push('<img src="https://res.cloudinary.com/dzsomaq4z/image/upload/v1696166602/Icons/ae3ufl4s59dy7tvh0tsb.png" alt="Image 1">');
buttonHTML.push('</button>');

buttonHTML.push('<button id="stop-btn">');
buttonHTML.push('<img src="https://res.cloudinary.com/dzsomaq4z/image/upload/v1696166664/Icons/gj2gn1upqjimsgv2j8cz.png" alt="Image 2">');
buttonHTML.push('</button>');

buttonHTML.push('<button id="button-3">');
buttonHTML.push('<img src="https://res.cloudinary.com/dzsomaq4z/image/upload/v1696166781/Icons/cawunk9gdd9yfnnvlnei.png" alt="Image 4">');
buttonHTML.push('</button>');

// buttonHTML.push('<button id="button-4">');
// buttonHTML.push('<img src="https://drive.google.com/file/d/1qRNSARV4onwh48OJHzbLVyAvFzQ-D5H8/view?usp=sharing" alt="Image 3">');
// buttonHTML.push('</button>');

// buttonHTML.push('<button id="button-5">');
// buttonHTML.push('<img src="https://drive.google.com/file/d/1ghR3hHMOzdFeHcv6L6LcW2h9JuRO4OxU/view?usp=sharing" alt="Image 5">');
// buttonHTML.push('</button>');

// Inject the button HTML into the div element
divElement.innerHTML = buttonHTML.join('');




var recorder = null;

// Move this call outside of the onAcessApproved() function
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request_recording") {
    sendResponse(`processed: ${message.action}`)
    navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        width: 999999999,
        height: 999999999
      }
    }).then((stream) => {
      document.body.appendChild(divElement)
      onAcessApproved(stream);
    });
  }
  if (message.action === "stopvideo"){
    console.log("stoppingg video")
    sendResponse(`processed: ${message.action}`)
    if(!recorder) return console.log('no recorder')
    recorder.stop()
  }
  ;
});

function onAcessApproved(stream) {
  recorder = new MediaRecorder(stream);
  recorder.start();
recorder.onstop = function() {
  stream.getTracks().forEach(function(track) {
    if (track.readyState === "live") {
      track.stop();
    }
  })
}
};
if(recorder){
recorder.ondataavailable = function(event) {
  let recordedBlob = event.data;
  let url = URL.createObjectURL(recordedBlob);

  let a = document.createElement("a");

  a.style.display = "none";
  a.href = url;
  a.download = "screen-recording.webm";

  document.body.removeChild(a);
  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
};


//  stop button
//  stop button
const stopBtn = document.querySelector('#stop-btn');

stopBtn.addEventListener("click", () => {
  if (!recorder) {
    console.log('Recorder is not initialized');
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true }, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,{action: "stopvideo"}, function(response){
      if(!chrome.runtime.lastError){
        console.log(response)
      } else{
        console.log(chrome.runtime.lastError, "error line 101")
      }

    } )
  });

  document.body.removeChild('div');
});