const teamOp = require('./teamOperation');

//{'introduction' : string, 'teamTitle' : string, 'maxMember' = integer , 'category' : string, 'status' : 'string', 'reminder' : string}

var jsIn = {'teamID':2,'introduction' : 'shuaiqidezu', 'teamTitle' : 'blah_blah', 'maxMember' : 9 , 'category' : 'Eating', 'status' : 'hiring', 'reminder' : 'zhuyiyanzhi'};

teamOp.editTeam(jsIn,(err,result)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log(result);
  }
});
