/**
* Project           : JusTeam/client
*
* Module name       : LogDepButton
*
* Author            : XU Lu
*
* Date created      : 20180318
*
* Purpose           : Reusable button module that is only accessible after login
*                      Uses Redux to fetch login status
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
**/
import React from 'react'
import {Button} from 'antd'
import {connect} from 'react-redux'

const mapStateToProps= state=>{
    console.log("state fetched:", JSON.stringify(state)) ;
    return{
        userID: state.userID
    }
}
const mapDispatchToProps= ()=>{
    return{
    }
}
const logDepButton=function({userID=undefined,text=''}) {
    if(userID)
        return (
            <Button type="ghost">
                {text}
            </Button>
        );
    return(
        <Button disabled type="ghost">
            {text}
        </Button>
    );
}
const LogDepButton= connect(mapStateToProps,mapDispatchToProps())(logDepButton)
export default  LogDepButton
