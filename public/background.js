const backgroundScriptUrl = chrome.runtime.getURL('background.js');
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if(changeInfo.status === "complete" && /^http/.test(tab.url)){
        chrome.scripting.executeScript({
        target: {tabId},
        files: ["/content.js"]
     }).then(()=>{
        console.log("we are here")
     }).catch(err=> console.log(err, "error in backgroung script"))
    }
}) 




