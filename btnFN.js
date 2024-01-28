





// to communicate tpo renderer process to mmain process

//we set a waiting message that come from any other and we define action on that

//ex   on"hello" say hi


let  defauultFontSize = 20;

let TextArea= document.querySelector('textarea');


const electron = require('electron');

const {ipcRenderer}= electron;





function increaseFont(){

    TextArea.style.fontSize=`${++defauultFontSize}px`;

}

function decreaseFont(){
    TextArea.style.fontSize=`${--defauultFontSize}px`;
}



function SaveText(){
    let text = TextArea.value;
    // console.log(text);






    //takes 2 parameter 1) key 2) want to send

    //key:  is like main process is look for key as soon as it got the key  then it do further process defined in main process
//ipc renderer for renderer process. this is a rendderer process
    

    ipcRenderer.send('save',text);

}

ipcRenderer.on('saved',(evet,res)=>{
    console.log(res);
   
})


ipcRenderer.on('saveclicked',()=>{
  
    SaveText();
})

