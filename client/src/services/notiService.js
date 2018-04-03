import {_domain,_new_noti_num,_new_noti_list,_noti_delete,_noti_history}from './Urlparams'

const democontent = {"blocks":[{"key":"a28ti","text":"This is a demo Post.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":20,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fm13f","text":"here we have an image!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8srng","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1lhtf","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"2q8mg","text":"and 😀","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3bee4","text":"and colorful text","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":4,"length":13,"style":"color-rgb(209,72,65)"}],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVE-4_zEbt3e1kwojwImbB7cJjMxLBjG4M_O6RXisnxaY1jYul","height":"auto","width":"auto","alt":"hahahah"}}}}

const getNewNotiNum=()=>{

    return (
        fetch(_domain+_new_noti_num,
            {
                method:'GET',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                },

            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}
const getNewNotiList=()=>{
//   const defaultNoti=
// {
//     "status": true,
//     "error": "Error message (string)",
//     "numOfMessages": 12,
//     "messages": [
//         {
//             "messageID" : 12306,
//             "messageType": "JoinRequest",
//             "timeStamp" : "2018-03-08T10:02:25.000Z",
//             "content": {
//               "teamToBeJoined":"CSCI3280Group",
//               "applicant":"lalala",
//               "joinInfo":"I want to join it.",
//             },
//         },
//         {
//           "messageID" : 12308,
//           "messageType": "NewAppcationResult",
//           "timeStamp" : "2018-03-08T10:02:25.000Z",
//           "content": {
//             "teamApplied":"CSCI3280Group",
//             "result":"your result is: Accepted",},
//         },
//         {
//           "messageID" : 12307,
//           "messageType": "TeamPublicMessage",
//           "timeStamp" : "2018-03-08T10:02:25.000Z",
//           "content": {  "teamToBeUpdated":"CSCI3280Group",
//           "sender":"lahala",
//           "message":"hahahahahahahhahahaha",},
//         },
//         {
//             "messageID" : 12306,
//             "messageType": "JoinRequest",
//             "timeStamp" : "2018-03-08T10:02:25.000Z",
//             "content": {
//               "teamToBeJoined":"CSCI3280Group",
//               "applicant":"lalala",
//               "joinInfo":"I want to join it.",
//             },
//         },
//         {
//           "messageID" : 12308,
//           "messageType": "NewAppcationResult",
//           "timeStamp" : "2018-03-08T10:02:25.000Z",
//           "content": {
//             "teamApplied":"CSCI3280Group",
//             "result":"your result is: Accepted",},
//         },
//         {
//           "messageID" : 12307,
//           "messageType": "TeamPublicMessage",
//           "timeStamp" : "2018-03-08T10:02:25.000Z",
//           "content": {  "teamToBeUpdated":"CSCI3280Group",
//           "sender":"lahala",
//           "message":"hahahahahahahhahahaha",},
//         },
//         {
//             "messageID" : 12306,
//             "messageType": "JoinRequest",
//             "timeStamp" : "2018-03-08T10:02:25.000Z",
//             "content": {
//               "teamToBeJoined":"CSCI3280Group",
//               "applicant":"lalala",
//               "joinInfo":"I want to join it.",
//             },
//         },
//         {
//           "messageID" : 12308,
//           "messageType": "NewAppcationResult",
//           "timeStamp" : "2018-03-08T10:02:25.000Z",
//           "content": {
//             "teamApplied":"CSCI3280Group",
//             "result":"your result is: Accepted",},
//         },
//         {
//           "messageID" : 12307,
//           "messageType": "TeamPublicMessage",
//           "timeStamp" : "2018-03-08T10:02:25.000Z",
//           "content": {  "teamToBeUpdated":"CSCI3280Group",
//           "sender":"lahala",
//           "message":"hahahahahahahhahahaha",},
//         },
//         {
//             "messageID" : 12306,
//             "messageType": "JoinRequest",
//             "timeStamp" : "2018-03-08T10:02:25.000Z",
//             "content": {
//               "teamToBeJoined":"CSCI3280Group",
//               "applicant":"lalala",
//               "joinInfo":"I want to join it.",
//             },
//         },
//         {
//           "messageID" : 12308,
//           "messageType": "NewAppcationResult",
//           "timeStamp" : "2018-03-08T10:02:25.000Z",
//           "content": {
//             "teamApplied":"CSCI3280Group",
//             "result":"your result is: Accepted",},
//         },
//         {
//           "messageID" : 12307,
//           "messageType": "TeamPublicMessage",
//           "timeStamp" : "2018-03-08T10:02:25.000Z",
//           "content": {  "teamToBeUpdated":"CSCI3280Group",
//           "sender":"lahala",
//           "message":"hahahahahahahhahahaha",},
//         },
//     ]
// };
// return(defaultNoti);
    return (
        fetch(_domain+_new_noti_list,
            {
                method:'GET',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                },

            }
        )
            .then(async (response)=>{
                var a = await response.json();
                console.log(a);
                return a;
            })
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}
const getNotiHistory=(start,end)=>{
    return (
        fetch(_domain+_noti_history+"?start="+start+"&end="+end,
            {
                method:'GET',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                },

            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}
const deleteNoti=(notiId,notiType)=>{
    return (
        fetch(_domain+_noti_delete,
            {
                method:'GET',
                credentials: "include",
                headers:{
                    Accept:'application/json',
                    messageID:notiId,
                    messageType:notiType,
                },

            }
        )
            .then((response)=>response.json())
            .catch((error)=>{
                console.log('Error occurred'+JSON.stringify(error));
                return({error: error});
            })
    );
}

export{getNewNotiNum,getNewNotiList,getNotiHistory,deleteNoti};
