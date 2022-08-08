

// //
// setTimeout(() => console.log('🐎 finishes!',1000))

//  console.log('🏃🏻‍♀️ finishes!');


const EventEmitter = require("express")

const celebrity  = EventEmitter()

  //subcribe  to celebrity for oberserver 1

celebrity.on('race win',()=>{
console.log('congratulation you are the best!');

})
celebrity.on('race win',()=>{
   console.log('boo i could have done better than that!');
   
   })
   celebrity.emit('race win')
   celebrity.emit('race win')
 


