import {_domain,_create_team,_delete_team,_edit_team,_add_team_member,
    _delete_team_member,_edit_team_member_authority,_get_recommend_team,
    _get_user_teams,_get_team_events,_get_one_event,_create_event,
    _delete_event,_edit_event,_send_post,_view_one_team,_join_team}from './Urlparams'




const democontent = {"blocks":[{"key":"a28ti","text":"This is a demo Post.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":20,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fm13f","text":"here we have an image!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8srng","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1lhtf","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"2q8mg","text":"and 😀","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3bee4","text":"and colorful text","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":4,"length":13,"style":"color-rgb(209,72,65)"}],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVE-4_zEbt3e1kwojwImbB7cJjMxLBjG4M_O6RXisnxaY1jYul","height":"auto","width":"auto","alt":"hahahah"}}}}

const createNewTeam=(data)=> {

        return (
            fetch(_domain+_create_team,
                {
                    method:'POST',
                    credentials: "include",
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data),
                }
            )
                .then((response)=>response.json())
                .catch((error)=>{
                    console.log('Error occurred'+JSON.stringify(error));
                    return({error: error});
                })
        );

}

const applyForTeam=(data)=>{

  return (
      fetch(_domain+_join_team,
          {
              method:'POST',
              credentials: "include",
              headers:{
                  Accept:'application/json',
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(data),
          }
      )
          .then((response)=>response.json())
          .catch((error)=>{
              console.log('Error occurred'+JSON.stringify(error));
              return({error: error});
          })
  );

}

const deleteTeam= (teamID)=> {

    return (
        fetch(_domain+_delete_team+"?teamID="+teamID,
            {
                method:'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );

}

const editTeam=(data)=> {

    return (
        fetch(_domain+_edit_team,
            {
                method:'POST',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data),
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );

}

const addMember=(userID,teamID)=> {

    return (
        fetch(_domain+_add_team_member+"?teamID="+teamID+"&newMember="+userID,
            {
                method: 'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}
const viewOneTeam=(teamID)=> {

    return (
        fetch(_domain+_view_one_team+"?teamID="+teamID,
            {
                method: 'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );

}

const editAuthority=(userToChange,rightToChange,teamID)=> {

    return (
        fetch(_domain+_edit_team_member_authority+"?userToChange="+userToChange+"&rightToChange="+rightToChange+"&teamID="+teamID,
            {
                method:'GET',
                credentials: "include",

            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );

}

const deleteMember=(userID,teamID)=> {

    return (
        fetch(_domain+_delete_team_member+"?teamID="+teamID+"&deletedMember="+userID,
            {
                method: 'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );

}

const getRecommendTeam=()=> {

    return (
        fetch(_domain+_get_recommend_team,
            {
                method:'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );

}

const getUserTeams=(teamList)=>{
    return (
        fetch(_domain+_get_user_teams+"?teamList="+teamList,
            {
                method:'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}

const getTeamEvents=(teamID)=>{
    return (
        fetch(_domain+_get_team_events+"?teamID="+teamID,
            {
                method:'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );

}

const getOneEvent=(eventID)=>{
    return (
        fetch(_domain+_get_one_event+"?eventID="+eventID,
            {
                method:'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}

const createEvent=(data)=>{
    return (
        fetch(_domain+_create_event,
            {
                method:'POST',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data),
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}

const deleteEvent=(teamID,eventID)=>{
    return (
        fetch(_domain+_delete_event+"?teamID="+teamID+"&eventID="+eventID,
            {
                method:'GET',
                credentials: "include",
            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}

const editEvent=(data)=>{
    return(
    fetch(_domain+_edit_event,
        {
            method:'POST',
            credentials: "include",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data),
        }
    )
        .then((response)=>response.json())
        .catch((error)=>{
            console.log('Error occurred'+JSON.stringify(error));
            return({error: error});
        })
);

}

const sendNewPost=(userID,teamID,eventID,data)=>{
    return(
        fetch(_domain+_send_post,
            {
                method:'POST',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    article:data,
                    isNew:1,
                    isFinal:1,
                    userID:userID,
                    teamID:teamID,
                    eventID:eventID,
                    postTitle:"A new post of "+userID,
                    tags:[userID,teamID,eventID],
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


export{createNewTeam,getRecommendTeam,addMember,
    deleteMember,editTeam,editAuthority,
    deleteTeam,getUserTeams,getTeamEvents,
    getOneEvent,createEvent,deleteEvent,
    editEvent,sendNewPost, viewOneTeam, applyForTeam};
