
var {_domain,_log_in,_sign_up,_upload_image,_log_out,_get_user_info}=require( './Urlparams');

const logIn=(userID)=>{
    console.log('calling action creator:',userID);
    return({

        type:'LOG_INOUT',
        userID:userID,
    });}

const signUpSubmit=(value)=>{
    return (
        fetch(_domain+_sign_up,
            {
                method:'POST',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(value)
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}
const defaultinfo= {
    userID: 'Van Darkholme',
    nickname:'world of wonder',
    birthday: '1919/8/10',
    phone: '+852-114514',
    introduction: 'My name is van, I am an artist, a preformance artist.',
    major:'computer Science',
    institution:'CUHK',
    region:'HK',
    gender:'male',
    teamList:[27,28],
};

const fetchActInfo=(userID=undefined)=>{
    if(userID) {
        return(
        fetch(_domain + _get_user_info,
            {
                method: 'POST',
                credentials: "include",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userID,
                })
            }
        )
            .then((response) => response.json())
            .catch((error) => {
                console.log('Error occurred' + JSON.stringify(error));

                // only for development!!!
               return(defaultinfo);

                return ({error: error});
            })
    );
    }
    else{
        return(
        fetch(_domain + _get_user_info,
            {
                method: 'POST',
                credentials: "include",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                }),
            }
        )
            .then((response) => response.json())
            .catch((error) => {
                console.log('Error occurred' + JSON.stringify(error));

                // only for development!!!
               // return(defaultinfo);

                return ({error: error});

            }));
    }

}

const logInAuth=(userID,password)=>{
    return (
        fetch(_domain+_log_in,
            {
                method:'POST',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    userID:userID,
                    password:password,
                }),
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}

const logOutService=()=>{
    return (
        fetch(_domain+_log_out,
            {
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({

                }),
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );

}

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


 const uploadImage=(file)=>{
    const data=new FormData();
    console.log("loading image! ");

    return(
        {
            path:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVE-4_zEbt3e1kwojwImbB7cJjMxLBjG4M_O6RXisnxaY1jYul"
        }
    )

     return (
         fetch(_domain+_upload_image,
             {
                 method:'POST',
                 credentials: "include",
                 headers:{
                     Accept:'application/json',
                     'Content-Type':'application/json'
                 },
                 body: data.append('image',file),
             }
         )
             .then((response)=>response.json())
             .catch((error)=>{
                 console.log('Error occurred'+JSON.stringify(error));
                 return({error: error});
             })
     );
 }

module.exports={
    logIn:logIn,
    logOut:logOut,
    requestTeam:requestTeam,
    receiveTeam:receiveTeam,
    logInAuth:logInAuth,
    fetchActInfo:fetchActInfo,
    signUpSubmit:signUpSubmit,
    uploadImage:uploadImage,
    logOutService:logOutService,
};
