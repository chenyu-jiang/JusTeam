var team = require("./teamOperation");

var intro = "This is a test introduction. This team is heading for Shenzhen and will go to the happy valley. We are seeking for challengers.";
var json = {
    introduction : intro,
    teamTitle : "JustTeam",
    maxMember : 4,
    category : "Travel",
    status : "recruiting",
    reminder : "Don't forget to bring your umbrella."
}
team.createTeam(json,(err,result)=>{
    //pass
    if(err) console.log(err);
});
