import {_domain,_new_noti_num,_new_noti_list,_noti_delete,_noti_history}from 'Urlparams'

const getNewNotiNum=()=>{
    return (
        fetch(_domain+_new_noti_num,
            {
                method:'GET',
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
    return (
        fetch(_domain+_new_noti_list,
            {
                method:'GET',
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
const getNotiHistory=(start,end)=>{
    return (
        fetch(_domain+_noti_history,
            {
                method:'GET',
                headers:{
                    Accept:'application/json',
                    start:start,
                    end:end,
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
module.exports={
    getNewNotiNum:getNewNotiNum,
    getNewNotiList:getNewNotiList,
    getNotiHistory:getNotiHistory,
    deleteNoti:deleteNoti,

}