/***
Get that url, get the current url from the tab and the title of the page and send it to NodeJS endpoint

***/

var tab = null;
/*chrome.tabs.getCurrent(function(tab){
  console.log(tab.url);
});*/
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    tab = tabs[0];
    //console.log(tab.url);
    //console.log(tab.title);
    document.getElementById("tabTitle").innerHTML = tab.title;
    document.getElementById("tabURL").innerHTML = tab.url;
});

function reqListener() {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener('load',reqListener);

document.addEventListener('DOMContentLoaded', () => {
  var btn = document.getElementById("btnSaveLink");
  btn.addEventListener('click',(e) =>{
    var inp_tags = document.getElementById("inp_tags").value;
    var tags = inp_tags.split(',');
    oReq.open('POST',"http://localhost:3001/urls", true);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send(JSON.stringify({title:tab.title,url:tab.url, tags:tags}));
  });
});
