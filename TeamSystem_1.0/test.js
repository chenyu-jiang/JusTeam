const eventOps = require('./eventOperation');
//create input interface: {'startTime' = string(datetime), 'endTime' = string(datetime), 'title' = string, 'location' = string, 'specification' = string}

/*var a = {'startTime' : 'blah-blah', 'endTime' : 'blah-blah', 'title' : 'blah-blah', 'location' : 'blah-blah', 'specification' : 'blah-blah'};
console.log(a);
eventOps.creatEvent(a,(err,result)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log(result);
  }
});*/
/*eventOps.editEvent({'eventID':1,'postID':134679},(err,result)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log(result);
  }
  return;

});*/

var a = undefined;

async function foo(){
  await new Promise((resolve, reject) =>{
    eventOps.askEvent(1,(err,result) =>{
      if(err) {
        reject(err);
      }
      else{
        a = result;
        resolve();
      }
    });
  });
  a.title = 'keke';
  await new Promise((resolve, reject) =>{
    eventOps.editEvent(a,(err,result) =>{
      if(err) {
        reject(err);
      }
      else{
        a = result;
        resolve();
      }
    });
  });
  
};
foo();
