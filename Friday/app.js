//elements
const startBtn=document.querySelector("#start");
const stopBtn=document.querySelector("#stop");
const speakout=document.querySelector('#speakout');
const time=document.querySelector("time");
const battery=document.querySelector('#battery')
const song=document.querySelector("#audio");
const song1=document.querySelector("#audio1");
const msgs=document.querySelector(".messages");

//
let charge,chargeStatus, connectivity, currentTime
chargeStatus = "unplugged"


//chat function
function createmsg(who,msg){
  let newmsg=document.createElement("p")
  newmsg.innerText=msg;
  newmsg.setAttribute("class",who)
  msgs.appendChild(newmsg)

}




//friday commands
let friday=[]
friday.push("hi jarvis");
friday.push("open google");
friday.push("open youtube");
friday.push("open amazon");
friday.push("open firebase");
friday.push("search for");
friday.push("play");
friday.push("open github");
friday.push("open my github profile");
friday.push("open instagram");
friday.push("tell me about yourself");
friday.push("weather");
friday.push("close this");
friday.push("are you there");
friday.push("shutdown");
friday.push("full weather report");



//weather setup
let weatherStatement = "";

function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=929164c093e6b80f20bde3b0128901a6`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}
// convert kelvin to celcius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}
let joke1="";
const request = new XMLHttpRequest();
 
request.open('GET', 'https://api.icndb.com/jokes/random');
request.send(); 
 
request.onload=()=> {
  if (request.status === 200) {
    console.log("Success"); 
    //Extracting data
    var joke = JSON.parse(request.response).value.joke;
    joke1=`here you go sir ${joke}`;
  } 
};
 
request.onerror = () => {
  console.log("error")
}; 

//time setup
  let dt=new Date()
document.getElementById("time").innerHTML =dt.toLocaleTimeString();
setInterval(() => {
  let dt=new Date()
  document.getElementById("time").innerHTML =dt.toLocaleTimeString();
}, 1000);



//battery
let batteryPromise = navigator.getBattery();
batteryPromise.then(batteryCallback);

function batteryCallback(batteryObject) {
   printBatteryStatus(batteryObject);
}

function printBatteryStatus(batteryObject) {
  console.log("Percentage", batteryObject.level);
  console.log("IsCharging", batteryObject.charging);
  //battery.textContent=`${batteryObject.level*100}%`;
  if(batteryObject.charging==true){
    document.querySelector(".battery").style.width="200px";
    battery.textContent=`${(batteryObject.level*100).toFixed(2)}% Charging`;
  }
  if(batteryObject.charging==false){
    document.querySelector(".battery").style.width="200px";
    battery.textContent=`${(batteryObject.level*100).toFixed(2)}% not Charging`;
  }
}

//internet status
if(navigator.onLine){
  document.querySelector("#internet").textContent = "online"
  connectivity = "online"
} else {
  document.querySelector("#internet").textContent = "offline"
  connectivity = "offline"
}
setInterval(() => {
  if(navigator.onLine){
    document.querySelector("#internet").textContent = "online"
    connectivity = "online"
  } else {
    document.querySelector("#internet").textContent = "offline"
    connectivity = "offline"
  }
}, 60000);

//

//Jarvis_setup
if(localStorage.getItem("jarvis_setup")!==null){
weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
}

//jarvis info setup
const setup=document.querySelector(".jarvis_setup");
setup.style.display="none";
if(localStorage.getItem("jarvis_setup")==null){
  //setup.style.display="flex";
  setup.style.display="block";
  setup.querySelector("button").addEventListener("click",userInfo);
}
//userinfo function
function userInfo(){
  let setupInfo={
    name:setup.querySelectorAll("input")[0].value,
    bio:setup.querySelectorAll("input")[1].value,
    location:setup.querySelectorAll("input")[2].value,
    instagram:setup.querySelectorAll("input")[3].value,
    github:setup.querySelectorAll("input")[4].value,
  }

  let testArr=[]
setup.querySelectorAll("input").forEach((e)=>{
  testArr.push(e.value);
})
if(testArr.includes("")){
  readOut("Some columns are missing sir. Please fill all the fields in the form.");
}else{
  localStorage.clear();
  localStorage.setItem("jarvis_setup",JSON.stringify(setupInfo));
  setup.style.display="none";
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
}

}
//array of windows
let windowsB=[]
//speech recognition setup
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new SpeechRecognition();
//recognition.continuous = true;
//speech recognition start
recognition.onstart=function(){
    console.log("vr active");
}
//speech recognition stop
recognition.onspeechend=function(){  
    console.log("vr deactive");}

    document.querySelector("#start_jarvis").addEventListener("click",()=>{
      recognition.start();
        //window.open(`${window.location.href}`,"newWindow","menubar=true,location=true,resizable=false,scrollbars=false,width=200,height=200,top=0,left=0")
      })
//auto jarvis
function autoJarvis() {
  setTimeout(() => {
    recognition.start();
  }, 5000);
}
//speech result
recognition.onresult=function(event){
  recognition.continuous=true;
  autoJarvis();
   // console.log(event);
    let current=event.resultIndex;
    let transcript=event.results[current][0].transcript;
    transcript=transcript.toLowerCase();
    let userdata=localStorage.getItem("jarvis_setup");
    createmsg("usermsg",transcript)
   
    //readOut(transcript);
    /*
    Hi-hello sir
    open google-it has to say opening google and open the www.google.com
    */
   if(transcript.includes("hi jarvis")){
       readOut("Hello sir");
       console.log("hello sir");
   }
   if(transcript.includes("what is internet status")){
    readOut(`you are ${connectivity}`);
}
if (transcript.includes("what's my name")) {
  readOut(`Sir, I know that you are ${JSON.parse(setupInfo).name}`);
}
if(transcript.includes("open file")){
window.open('FileC.java');
}
if (transcript.includes("what's my bio")) {
  readOut(`Sir, I know that you are ${JSON.parse(setupInfo).bio}`);
}
if(transcript.includes("open notes")){
  window.open('index1.html');
}
if(transcript.includes("my commands")){
  var w=window.open();
  for(let i=0;i<friday.length;i++){
    w.document.write("");
    w.document.write(`<h4 style=color:blue;>${i+1}.${friday[i]}</h4>`);
  }
  //w.document.write(`${friday}`);
  w.document.close();
}
let friday1=[]
//command addition
if((friday.indexOf(transcript)==-1)){
if(transcript.includes("my commands")){
  w.document.write(`<h4 style=color:blue;>${i+1}.${friday[i]}</h4>`);
}
  friday1.push(transcript);
  window.open(`https://www.google.com/search?q=${transcript}`);
}

   if(transcript.includes("youtube")){
       let a=window.open("https://www.youtube.com/");
       windowsB.push(a)
   }

   if(transcript.includes("netflix")){
    let input=transcript.split("");
    input.splice(0,15);
    input.pop();
    input=input.join("").split(" ").join("+");
    console.log(input);
    let a=window.open(`https://www.netflix.com/search?q=${input}`);
    windowsB.push(a)
}

   if (transcript.includes("change my information")) {
    readOut("Opening the information tab sir");
    localStorage.clear();
    setup.style.display = "flex";
    setup.querySelector("button").addEventListener("click", userInfo);
  }
if(transcript.indexOf("close this")>-1){
  readOut("Closing sir");
  document.querySelector(".commands").style.display="none";
  setup.style.display="none";
}
  if(transcript.includes("google")){
       window.open("https://www.google.com/");
       windowsB.push(a)
  }
  var OSName = "Unknown";
if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";
var browser = navigator.appName;
var lang=navigator.language;

if(transcript.includes("os information")){
  readOut(`The os name is ${OSName},You are currently using ${browser},language info is: ${lang},Platform is:${navigator.platform},other information is:${navigator.userAgent}`);
  

}
   if(transcript.includes("amazon")){
   let a= window.open("https://www.amazon.com/");
   windowsB.push(a)
}

if(transcript.includes("firebase")){
    let a=window.open("https://console.firebase.google.com/");
    windowsB.push(a)
}
//searching something in google
if(transcript.indexOf("search")>-1){
    let input=transcript.split("");
    input.splice(0,7);
    input.pop();
    input=input.join("").split(" ").join("");
    console.log(input);
  let a= window.open(`https://www.${input}.com`);
  windowsB.push(a)

}
//playing a song in youtube
if(transcript.includes("play")){
    readOut("There you go sir");
    let input1=transcript.split("");//splits the text into individual characters
    console.log(input1);
    input1.splice(0,4);//ignore the play word and separate from the text
    input1.pop();//remove last space
    input1=input1.join("").split(" ").join("+");//join all individual characters and add + to it to search for a query
    console.log(input1);
  let a=window.open(`https://www.youtube.com/results?search_query=${input1}`);
  windowsB.push(a)

}
if (transcript.indexOf("open calendar")>-1) {
  let a = window.open("https://www.timeanddate.com/calendar/");
  windowsB.push(a)
}
if(transcript.includes("bluetooth")){
  navigator.bluetooth.requestDevice({
    acceptAllDevices: true,}).then(function(device) {
    console.log('Name: ' + device.name);
    // Do something with the device.
  })
  .catch(function(error) {
    console.log("Something went wrong. " + error);
  });
}



//github commands
if(transcript.indexOf("github")>-1){
  let a=window.open("https://github.com/")
  windowsB.push(a)
}

if(transcript.indexOf("telugu music")>-1){
  let a=window.open("https://music.youtube.com/watch?v=DCRqeCH21Qo&list=RDAMVMDCRqeCH21Qo")
  windowsB.push(a)
}

if(transcript.indexOf("github profile")>-1){
  let a=window.open(`https://github.com/${JSON.parse(userdata).github}`)
  windowsB.push(a)
}

if(transcript.indexOf("instagram")>-1){
 let a= window.open(`https://www.instagram.com/${JSON.parse(userdata).instagram}`)
 windowsB.push(a)
}
if(transcript.indexOf("files")>-1){
  readOut("opening files");
}
if (transcript.includes("tell me about yourself")) {
  song1.play();
}

if(transcript.includes("what is your favorite car")){
  readOut("i love lot of cars but my favourite one is bugati chirion.");
}
if(transcript.includes("are you threatening me")){
  readOut("not a threat. A promise. yes, it is.sure did why yes. I am");
}

if (transcript.includes("shut down")) {
  readOut("system is shutting down. have a great day sir");
  recognition.stop();
  setInterval(() => {
    window.close();
  }, 7000);

}
if(transcript.includes("book")){
  recognition.start();
  var w=window.open();
  w.document.write(`${transcript}`);
  w.document.close();
  recognition.stop();
}

if(transcript.includes("what is the time")){
  let dt=new Date()
  document.getElementById("time").innerHTML =dt.toLocaleTimeString();
  setInterval(() => {
    let dt=new Date()
    document.getElementById("time").innerHTML =dt.toLocaleTimeString();
  }, 1000);
  readOut(`The time is ${dt.toLocaleTimeString()}`);
}
if (transcript.includes("are you there")) {
  readOut("yes sir");
}
if(transcript.indexOf("do math")>-1){
var v=prompt("your calculator");
readOut(`you calcuated ${v} and your answer is ${eval(v)}`);
}
if(transcript.indexOf("joke")>-1){
readOut(joke1);
}
if (
  transcript.includes("the weather") ||
  transcript.includes("temperature")
) {
  readOut(weatherStatement);
}

if (transcript.indexOf("weather report")>-1) {
  let a = window.open(
    `https://www.google.com/search?q=weather+in+${
      JSON.parse(localStorage.getItem("jarvis_setup")).location
    }`
  );
  windowsB.push(a)
}

};




document.querySelector("#jarvis_start").addEventListener("click", () => {
  recognition.start();
})
//jarvis speech
function readOut(message){
const speech=new SpeechSynthesisUtterance();
//different voices
const allVoices=speechSynthesis.getVoices();
speech.text=message;
speech.volume=3;
speech.voice=allVoices[23];
window.speechSynthesis.speak(speech);
createmsg("jmsg",message)
console.log("Speaking out");
}
//for avoiding default voice
window.onload=()=>{
    readOut("      ");
   // autoJarvis();
    song.addEventListener("ended",()=>{
      setTimeout(() => {
        
        //readOut("I am ready sir. Good to go");
        if(localStorage.getItem("jarvis_setup")==null){
          readOut("Sir, kindly fill out the form to have better experience of this web page");
        };
      }, 200);
    })
    //jarvis commands
    friday.forEach((e)=>{
      document.querySelector(".commands").innerHTML+=`<p>#${e}</p><br/>`
        })
  }
