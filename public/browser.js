//import Axios from "axios"


var Axios = require('axios')
  document.addEventListener("click",function(e){
  
    if(e.target.classList.contains("edit-me")){
    
      let userInput = prompt("enter your desired new item")
      console.log(userInput)
        Axios.post('/update-item',{text: userInput}).then(function(){
        
       
        
      }).catch(function(){
        console.log("try later")
      })
      console.log("banana")

    }
    })


