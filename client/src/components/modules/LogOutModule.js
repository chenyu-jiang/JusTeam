import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {message} from 'antd'
import {logOut,logOutService} from '../../services/accountService'

let logoutStatus=false;
const mapStateToProps=state=>{
    return{
        userID: state.userID,
        fromUrl:state.fromUrl,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        logOutDispatch: ()=>{
            logOutService().then(
                (response)=> {
                    if (response.logoutState) {
                        console.log("Logout successful");
                        logoutStatus = true;
                        dispatch(logOut());
                    }
                    else {
                        if (response.error) message.error("Error occurred when logging out:" + response.error);
                        else message.error("Failed to login!");
                    }
                }
        )
        }
    }
}
class LogOutModule extends  Component{
    render(){
    this.props.logOutDispatch();
    if(logoutStatus===true){
        logoutStatus= false;
        return(<Redirect to='/' />);
    }
    return(<Redirect to={this.props.fromUrl} />) ;
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LogOutModule);
