
const logIn=(userID)=>{
    console.log('calling action creator:',userID);
    return({

        type:'LOG_INOUT',
        userID:userID
    });}

 const logOut =()=>({

    type:'LOG_INOUT',
    userID:undefined
})

const requestTeam=(teamID)=>{
    console.log('calling view team action creator:',teamID);
    return({

        type:'REQUEST_TEAM',
        teamID:teamID
    });}

const receiveTeam=(teamID,json)=>{
    console.log('calling view team action creator:',teamID);
    return({

        type:'Receive_TEAM',
        teamID:teamID,
        teamInfo: json.data.children.map(child=>child.data) ,
        receivedAt: Date.now()
    });}

 module.exports={
    logIn: logIn,
     logOut: logOut,
     requestTeam:requestTeam,
     receiveTeam:receiveTeam
 }


